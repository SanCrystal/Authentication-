const formField = document.querySelector('form');
// const emailField = formValue.email;
// const userNameField = formValue.username;
// const phoneNumberField = formValue.phonenumber;
// console.log(emailField, userNameField, phoneNumberField)
formField.addEventListener("focusout", e => {
        const element = e.target.getAttribute('name');
        const elementValue = e.target.value
        if (element === "username") {
            const userName = elementValue;
            checkDuplicate(userName, 'userName')
        }
        if (element === "phonenumber") {
            const phoneNumber = elementValue;
            checkDuplicate(phoneNumber, 'phoneNumber')
        }
        if (element === "email") {
            const email = elementValue;
            checkDuplicate(email, 'email')
        }


    })
    //onfocusout

//fetch credentials for verification
const credentialsCheck = async(userCredential, credentialValue) => {
    const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userCredential, credentialValue })
    });

    return await res;
};

//check if duplicate value exist
const checkDuplicate = async function(value, valueSource) {

    //fetch value status
    const newValue = await credentialsCheck(value, valueSource);
    const credential = await newValue.json();

    if (credential.message === "available") {
        console.log(`${valueSource} is available`)
    }
    if (credential.message === "taken") {
        console.log(`${valueSource} already exist`)
    }
};