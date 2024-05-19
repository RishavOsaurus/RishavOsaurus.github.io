async function ft(){
    const apiData =  await fetch("https://api.ipify.org?format=json");
    const ipResponse = await apiData.json();
    const ip = ipResponse.ip
    const locationResponse =  (await fetch(`https://ipapi.co/${ip}/json/`));
    locationJSON = await locationResponse.json();
    console.log(locationJSON);
    let a = document.getElementById("main");
    setTimeout(()=>{
        a.innerHTML=`<p>Your Location: ${locationJSON.city} ${locationJSON.country}</p> <p> Your IP address:${ip} is now being tracked by the owner of this website. </p> <p> Your Internet Service provider is: </p> <p>${locationJSON.org} </p><p>Thank you for clicking in. We will now monitor your phone activities</p>`
    },2002)
   
}
ft();
console.log("Hello");
