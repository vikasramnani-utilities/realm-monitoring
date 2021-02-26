exports = async function(username, password, projectId){
  const arg = { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: "api/atlas/v1.0/groups/"+projectId+"/processes", 
    username: username, 
    password: password,
    headers: {'Content-Type': ['application/json'], 'Accept-Encoding': ['bzip, deflate']}, 
    digestAuth:true,
  };



  // The response body is a BSON.Binary object. Parse it and return.
  const responseProcess =  await context.http.get(arg)
  
  return EJSON.parse(responseProcess.body.text()); 

};