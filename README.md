-CREATE LOGIN 

     //updating and Edit Profile for current user
      const allUsersData= await axios.get(BaseUrl+'/feed',{withCredentials:true})
      console.log(allUsersData);

      1-LOGIN
      2-USERPROFILE
      3-FRIENDS LIST