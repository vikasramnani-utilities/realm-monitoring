exports = async function(clusterName) {
  
    const username = context.values.get("GLOBAL_OWNER_PUBLIC_KEY");
    const password = context.values.get("GLOBAL_OWNER_PRIVATE_KEY");
    const projectId = context.values.get("PROJECT_ID");
    const replicaSets = context.values.get("REPLICA_SETS");
    
    const processes = await context.functions.execute("getProcessesForProject", username, password, projectId)
    
    var databases = null;
    var measurements = [];

for (var i=0; i<processes.results.length;i++) {
  
    var hostId = processes.results[i].id
    var type =  await processes.results[i].typeName
    var replicaName = await processes.results[i].replicaSetName
    
  if(type == 'REPLICA_PRIMARY' && replicaSets.includes(replicaName)){
    
    var disks = await context.functions.execute("getDisksForProcess", username, password, projectId, hostId)
    
    for (var j=0; j<disks.results.length;j++) {
     var partitionName = disks.results[j].partitionName


        var response = await context.functions.execute("getMeasurementsForDisks",username, password, projectId, hostId, partitionName)
        
        var measurement = {
        "partitionName" : response.partitionName,
        "last_timestamp" : response.end,
        "start_timestamp" : response.start,

        }
        //console.log(response.body.text())
        for(var k=0; k<response.measurements.length;k++){
          currentMeasurement = response.measurements[k]
          if(currentMeasurement.dataPoints.length>0){
          measurement[currentMeasurement.name] = currentMeasurement.dataPoints
          }
        }
        measurements.push(measurement)
    }
}
}
  context.functions.execute("insertMonitoringData","monitoring", "diskstats", measurements)
  return measurements; 
}