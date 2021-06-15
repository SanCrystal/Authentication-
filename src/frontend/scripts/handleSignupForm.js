//grab the elements from the dom

const form = document.querySelector('form');

form.addEventListener('submit', async e => {

    let firstName = form.firstname.value;
    let lastName = form.lastname.value;
    let userName = form.username.value;
    let age = form.age.value;
    let gender = form.gender.value;
    let phoneNumber = form.phonenumber.value;
    let email = form.email.value;
    let password = form.password.value;
    let role = form.role.value;
    let imageUrl = form.profilepicture.value;
    e.preventDefault();

    console.log(JSON.stringify({ firstName, lastName, userName, age, gender, phoneNumber, email, password, role, imageUrl }))
    try {
        const res = await fetch('/signup', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, userName, age, gender, phoneNumber, email, password, role, imageUrl })
        });
        const data = await res.json();
        //redirects user to the 404 not found page

        console.log("handle signup : ", res.status, data)
        if (res.status === 404) {
            return location.assign("/404" + "&status=denied");
        }
        //redirects user afer successful login to the homepage

        if (res.status === 200) {
            //clear input form
            form.email.value = "";
            form.password.value = "";

            setTimeout(() => {
                alert(data.message)
            }, 1000);

            return location.assign("/");
        }
    } catch (err) {
        console.log(err)
    }

});