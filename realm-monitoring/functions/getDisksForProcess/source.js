exports = async function(username, password, projectId, hostId){
  console.log("hostId=" + hostId)
    const arg = { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: 'api/atlas/v1.0/groups/'+projectId+'/processes/'+hostId+'/disks', 
    username: username, 
    password: password,
    headers: {'Content-Type': ['application/json'], 'Accept-Encoding': ['bzip, deflate']}, 
    digestAuth:true,
  };



  // The response body is a BSON.Binary object. Parse it and return.
  const responseProcess =  await context.http.get(arg)
  console.log('response = '+responseProcess.body.text())
  return EJSON.parse(responseProcess.body.text()); 

}