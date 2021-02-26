exports = async function() {
  /*
    A Scheduled Trigger will always call a function without arguments.
    Documentation on Triggers: https://docs.mongodb.com/realm/triggers/overview/

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("<DB_NAME>").collection("<COLL_NAME>");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://docs.mongodb.com/realm/functions/context/#context-http
  */
  const username = context.values.get("GLOBAL_OWNER_PUBLIC_KEY");
  const password = context.values.get("GLOBAL_OWNER_PRIVATE_KEY");

  const projectID = context.values.get("PROJECT_ID");
  const clusterNames = context.values.get("CLUSTER_NAMES");
  const body = {paused: true};
  var n = 0;
  var result = "";
  //return clusterName + " clusters paused";
  for (n in clusterNames) {
    result = await context.functions.execute('modifyCluster', username, password, projectID, clusterNames[n], body);
    console.log(EJSON.stringify(result));
    if (result.error) {
      return result;
    }
  }
  return clusterNames.length + " clusters paused"; 
}
