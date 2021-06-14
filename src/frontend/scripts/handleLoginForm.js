//grab the elements from the dom

const form = document.querySelector('form');

form.addEventListener('submit', async e => {
    let email = form.email.value;
    let password = form.password.value;
    e.preventDefault();

    try {
        const res = await fetch('/login', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data = await res
            //redirects user to the 404 not found page
        if (res.status === 404) {
            return location.assign(res.url + "&access=denied");
        }
        //redirects user afer successful login to the homepage

        if (res.status === 200) {
            //clear input form
            form.email.value = "";
            form.password.value = "";
            return location.assign(res.url);
        }
    } catch (err) {
        console.log(err)
    }

});