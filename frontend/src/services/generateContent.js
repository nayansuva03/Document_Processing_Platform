export async function generateContent(prompt) {
  console.log(`From generateContant : ${prompt}`);

  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
    //body is like this becouse server likes to resive a json formate file.
  });

  if (!response.ok) {
    throw new Error(
      "Failed to generate content(alert from generateContant.js)",
    );
  }

  const data = await response.json();
  console.log(
    "From generateContant.js JSON.stringify(response) : " +
      JSON.stringify(response),
  );

  //server game e bhangbhosdo aape sarkhu karva or we can say redable banavva .json() mukel se.
  //For Example:
  //response we get is this'{"questions":[{"id":1,"question":"What is...?"}]}'
  // and the after .json our data becomes this 👇
  /* 
  
  {questions:
  [{
    id:1,
    question:"what is....."
  }]
  }

  kush samaj aaya bachhu extra "" remove thya in simplest word if you don't undersatd
  */
  return data;
}
