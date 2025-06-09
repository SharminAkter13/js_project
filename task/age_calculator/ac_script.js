function calculateAge(){
    const dodInput= document.getElementById("dob").ariaValueMax;
    
    if(!dobInput){
        document.getElementById("result").textContent = "Please enter your date of birth.";
        return;
    }
    const dob = new Date(dobInput);
    const today=new Date();

    let years = today.getFullYear()-dob.getFullYear();
    let months = today.getMonth()-dob.getMonth();
    let days = today.getDate()-dob.getDate();

    // If birth month hasn't occurred yet
    if(months<0 || (months===0 && days<0)){
        years--;
        months+= 12;
    }
    if (days<0) {
        const prevMonth =new Date(today.getFullYear(),today.getMonth(),0);
        days += prevMonth.getDate();
        months--;
    }
    document.getElementById("result").textContent = "You are "+years+" year's "+months+" month's "+days+" day's old";
    

}

