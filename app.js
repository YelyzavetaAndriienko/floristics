/* -------------------------------------------------- USER */
//localStorage.clear();
let usersArray = [];
let currentUser;
let choosenItems = [];
let choosenCards = [];
let priceArrayF = [];

function User(name, surname, phone, email, choosen, radio) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.choosen = choosen;
    this.radio = radio;
}

function User(user) {
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.email = user.email;
    this.choosen = user.choosen;
    this.radio = user.radio;
}

function ChoosenCard(choosenCard, left, img, right, rightTop, name, rightBottom, price, amountDiv, minus, amount, plus) {
    this.choosenCard = choosenCard;
    this.left = left;
    this.img = img;
    this.right = right;
    this.rightTop = rightTop;
    this.name = name;
    this.rightBottom = rightBottom;
    this.price = price;
    this.amountDiv = amountDiv;
    this.minus = minus;
    this.plus = plus;
    this.amount = amount;
}

function userSignUp() {
    let name = document.getElementById("nameSignUp");
    let surname = document.getElementById("surnameSignUp");
    let phone = document.getElementById("phoneSignUp");
    let email = document.getElementById("emailSignUp")

    if (name.value.length > 0 && surname.value.length > 0 && phone.value.length > 0 && email.value.length > 0 && phone.checkValidity() && email.checkValidity()) {

        let newUser = new User(name.value, surname.value, phone.value, email.value, [], "radio0");
        let userJson = {
            name: name.value.toString(),
            surname: surname.value.toString(),
            phone: phone.value.toString(),
            email: email.value.toString(),
            choosen: [],
            radio: "radio0",
        }

        document.getElementById("nameSignUp").value = "";
        document.getElementById("surnameSignUp").value = "";
        document.getElementById("phoneSignUp").value = "";
        document.getElementById("emailSignUp").value = "";

        if (userUnique(newUser) === true) {
            usersArray.push(newUser);
            localStorage.setItem("currentUser", JSON.stringify(userJson));
            window.location.href = "main.html";
        }
        else alert("Користувач з таким номером телефону або e-mail уже існує");
    } else alert("Неправильно введені дані");
}

function userUnique(user) {
    let phonesArray = [];
    let emailsArray = [];

    for (let i = 0; i < usersArray.length; i++) {
        phonesArray.push(usersArray[i].phone);
        emailsArray.push(usersArray[i].email);
    }

    if (phonesArray.includes(user.phone) === false && emailsArray.includes(user.email) === false) return true;
    else return false;
}

function userSignIn() {
    let name = document.getElementById("nameSignIn").value;
    let phone = document.getElementById("phoneSignIn").value;

    document.getElementById("nameSignIn").value = "";
    document.getElementById("phoneSignIn").value = "";

    if (userExist(name, phone) === true) window.location.href = "main.html";
    else alert("Користувача не знайдено");
}

function userExist(name, phone) {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let currentName = u.name.toString();
    let currentPhone = u.phone.toString();

    if (currentName === name && currentPhone === phone) return true;
    else return false;
}

function getUsersInfo() {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let phone = document.getElementById("phoneDivMain");
    phone.innerText = u.phone.toString();
    let name = document.getElementById("userName");
    name.innerText = u.name.toString();
}

function previousImg() {
    let el = document.getElementById("wallpaper").getAttribute("src");

    if (el === "./images/wallpapers/wallpaper5.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper4.jpg");
    } else if (el === "./images/wallpapers/wallpaper4.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper3.jpg");
    } else if (el === "./images/wallpapers/wallpaper3.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper2.jpg");
    } else if (el === "./images/wallpapers/wallpaper2.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper1.jpg");
    } else {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper5.jpg");
    }
}

function nextImg() {
    let el = document.getElementById("wallpaper").getAttribute("src");

    if (el === "./images/wallpapers/wallpaper2.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper3.jpg");
    } else if (el === "./images/wallpapers/wallpaper3.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper4.jpg");
    } else if (el === "./images/wallpapers/wallpaper4.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper5.jpg");
    } else if (el === "./images/wallpapers/wallpaper5.jpg") {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper1.jpg");
    } else {
        document.getElementById("wallpaper").setAttribute("src", "./images/wallpapers/wallpaper2.jpg");
    }
}

function chooseItem(item) {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    if (u.name.length > 0) {
        let items = u.choosen.slice();
        items.push(item);
        let userJson = {
            name: u.name.toString(),
            surname: u.surname.toString(),
            phone: u.phone.toString(),
            email: u.email.toString(),
            choosen: items,
            radio: u.radio,
        }
        localStorage.setItem("currentUser", JSON.stringify(userJson));
    } else {
        window.location = "./signUp.html";
    }
}

function createChoosenPopup() {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    if (u.name.length > 0) {
        let choosenPopup = document.getElementById("choosenPopup");
        openbox(choosenPopup);
        checkRadioDivs();
    }
}

function checkRadioDivs() {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen;
    if (items.length === 0) {
        document.getElementById("radioDiv0").style.display = 'none';
        document.getElementById("radioDiv1").style.display = 'none';
        document.getElementById("radioDiv2").style.display = 'none';
        document.getElementById("radioDiv3").style.display = 'none';
    } else {
        document.getElementById("radioDiv0").style.display = 'flex';
        document.getElementById("radioDiv1").style.display = 'flex';
        document.getElementById("radioDiv2").style.display = 'flex';
        document.getElementById("radioDiv3").style.display = 'flex';
    }

    if(disableRadio() === false) {
        document.getElementById("radio0").disabled = false;
        document.getElementById("radio1").disabled = false;
        document.getElementById("radio2").disabled = false;
        document.getElementById("radio3").disabled = false;
        if(u.radio === "radio0") document.getElementById("radio0").checked = true;
        else if(u.radio === "radio1") document.getElementById("radio1").checked = true;
        else if(u.radio === "radio2") document.getElementById("radio2").checked = true;
        else document.getElementById("radio3").checked = true;
    } else {
        document.getElementById("radio0").checked = true;
        document.getElementById("radio0").disabled = true;
        document.getElementById("radio1").disabled = true;
        document.getElementById("radio2").disabled = true;
        document.getElementById("radio3").disabled = true;
    }

    createChoosenCards(items);
    countFinalPrice();
}

function disableRadio() {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen;
    for (let n = 0; n < items.length; n++) {
        if (items[n].type === "flower") return false;
    }
    return true;
}

function countDuplicates(items) {
    let result = [];
    for (let i = 0; i < items.length; i++) {
        let c = 0;
        for (let k = 0; k < items.length; k++) {
            if (items[i].name === items[k].name) {
                c++;
                result[i] = [items[i], c];
            }
        }
    }
    let unique = result.map(JSON.stringify).reverse().filter(function (e, i, a) {
        return a.indexOf(e, i + 1) === -1;
    }).reverse().map(JSON.parse);
    return unique;
}

function getNames() {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen;
    let names = [];
    for (let n = 0; n < items.length; n++)
        names.push(items[n].name);
    return names;
}

function createChoosenCards(items) {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    items = u.choosen.slice();
    let choosenDiv2 = document.getElementById("choosenDiv2Content");
    let choosenCard, left, img, right, rightTop, name, rightBottom, price, deleteDiv, amountDiv, minus, amount, plus;
    let duplicates = countDuplicates(items);

    for (let i = 0; i < duplicates.length; i++) {
        choosenCard = document.createElement("div");
        left = document.createElement("div");
        img = document.createElement("img");
        right = document.createElement("div");
        rightTop = document.createElement("div");
        rightBottom = document.createElement("div");
        name = document.createElement("h5");
        price = document.createElement("h5");
        deleteDiv = document.createElement("div");
        amountDiv = document.createElement("div");
        minus = document.createElement("button");
        amount = document.createElement("h5");
        plus = document.createElement("button");

        choosenCard.id = "choosenCard";
        left.id = "left";
        img.alt = "flower";
        img.id = "choosenCardImg";
        img.setAttribute("src", duplicates[i][0].image);
        right.id = "right";
        rightTop.id = "rightTop";
        name.id = "choosenCardName";
        name.innerText = duplicates[i][0].name;
        rightBottom.id = "rightBottom";
        price.id = "choosenCardPrice";
        price.innerText = duplicates[i][0].price + " грн";
        deleteDiv.id = "deleteDiv";
        deleteDiv.innerText = "×";
        deleteDiv.onclick = function () {
            let choosenDiv2Content = document.getElementById("choosenDiv2Content");
            if (choosenDiv2Content.hasChildNodes()) {
                let card = choosenDiv2Content.lastElementChild;
                while (card) {
                    choosenDiv2Content.removeChild(card);
                    card = choosenDiv2Content.lastElementChild;
                }
            }
            deleteItem(duplicates[i][0]);
            checkRadioDivs();
        }

        amountDiv.id = "amountDiv";
        minus.id = "minus";
        minus.innerText = "-";
        amount.id = "amount";
        amount.innerText = duplicates[i][1];
        plus.id = "plus";
        plus.innerText = "+";

        let thisCard = new ChoosenCard(choosenCard, left, img, right, rightTop, name, rightBottom, price, amountDiv, minus, amount, plus);

        plus.onclick = function () {
            thisCard.amount.innerText = parseInt(thisCard.amount.innerText) + 1;
            plusItem(duplicates[i][0]);
            countFinalPrice();
        }

        minus.onclick = function () {
            if (parseInt(thisCard.amount.innerText) > 1) {
                thisCard.amount.innerText = parseInt(thisCard.amount.innerText) - 1;
                minusItem(duplicates[i][0]);
                countFinalPrice();
            }
        }

        choosenCards.push(thisCard);

        left.appendChild(img);
        rightTop.appendChild(name);
        amountDiv.appendChild(minus);
        amountDiv.appendChild(amount);
        amountDiv.appendChild(plus);
        rightBottom.appendChild(amountDiv);
        rightBottom.appendChild(deleteDiv);
        rightBottom.appendChild(price);
        right.appendChild(rightTop);
        right.appendChild(rightBottom);
        choosenCard.appendChild(left);
        choosenCard.appendChild(right);
        choosenDiv2.appendChild(choosenCard);
    }
}

function deleteItem(item) {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen.slice();
    let res = _.filter(items, function(n) { return n.name !== item.name; });

    let userJson = {
        name: u.name.toString(),
        surname: u.surname.toString(),
        phone: u.phone.toString(),
        email: u.email.toString(),
        choosen: res,
        radio: u.radio,
    }
    localStorage.setItem("currentUser", JSON.stringify(userJson));
}

function plusItem(item) {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen.slice();
    items.push(item);
    let userJson = {
        name: u.name.toString(),
        surname: u.surname.toString(),
        phone: u.phone.toString(),
        email: u.email.toString(),
        choosen: items,
        radio: u.radio,
    }
    localStorage.setItem("currentUser", JSON.stringify(userJson));
}

function minusItem(item) {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen.slice();
    let names = getNames();

    let index = names.indexOf(item.name);
    if (index > -1) items.splice(index, 1);

    let userJson = {
        name: u.name.toString(),
        surname: u.surname.toString(),
        phone: u.phone.toString(),
        email: u.email.toString(),
        choosen: items,
        radio: u.radio,
    }
    localStorage.setItem("currentUser", JSON.stringify(userJson));
}

function countFinalPrice() {
    let u = new User(JSON.parse(localStorage.getItem("currentUser")));
    let items = u.choosen;
    let finalPrice = document.getElementById("finalPrice");
    let radio0 = document.getElementById("radio0").checked;
    let radio1 = document.getElementById("radio1").checked;
    let radio2 = document.getElementById("radio2").checked;
    let radio3 = document.getElementById("radio3").checked;
    let price = 0;
    let radio;

    if (radio0 === true) { 
        price = 0;
        radio = "radio0";
    } 
    if (radio1 === true) { 
        price = 10;
        radio = "radio1";
    } 
    if (radio2 === true) { 
        price = 20;
        radio = "radio2";
    } 
    if (radio3 === true) { 
        price = 50;
        radio = "radio3";
    } 

    let userJson = {
        name: u.name.toString(),
        surname: u.surname.toString(),
        phone: u.phone.toString(),
        email: u.email.toString(),
        choosen: items,
        radio: radio,
    }
    localStorage.setItem("currentUser", JSON.stringify(userJson));

    for (let i = 0; i < items.length; i++) 
        price += items[i].price;

    finalPrice.innerText = price + " грн";
}

function closePopup(div, content) {
    div.style.display = 'none';
    div.removeChild(content);
}

function closeChoosenPopup(div, content) {
    div.style.display = 'none';
    if (content.hasChildNodes()) {
        let card = content.lastElementChild;
        while (card) {
            content.removeChild(card);
            card = content.lastElementChild;
        }
    }
}









/* -------------------------------------------------- FLOWERS */

let flowersArray = [];
let colors = [];

function Flower(name, color, description, price, image) {
    this.name = name;
    this.color = color;
    this.description = description;
    this.price = price;
    this.image = image;
    this.type = "flower";
}

function createFlowers() {
    let flower1 = new Flower("Альстромерія помаранчева", "помаранчева", "Найчастіше перуанські лілії вирощуються в теплиці на продаж. Вони дуже популярні у флористів. Особливе значення набувають вони для тих, хто розуміє мову квітів. Вони гармонійно поєднуються з трояндами, хризантемами, гербери, орхідеями, ірисами, надаючи букету об`ємність і щільність. Після зрізання гілки альстромерії довго не втрачають привабливості.", 38, "./images/flowers/alstroemeriaOrange.jpg");
    let flower2 = new Flower("Альстромерія рожева", "рожева", "Найчастіше перуанські лілії вирощуються в теплиці на продаж. Вони дуже популярні у флористів. Особливе значення набувають вони для тих, хто розуміє мову квітів. Вони гармонійно поєднуються з трояндами, хризантемами, гербери, орхідеями, ірисами, надаючи букету об`ємність і щільність. Після зрізання гілки альстромерії довго не втрачають привабливості.", 39, "./images/flowers/alstroemeriaPink.jpg");
    let flower3 = new Flower("Альстромерія червона", "червона", "Найчастіше перуанські лілії вирощуються в теплиці на продаж. Вони дуже популярні у флористів. Особливе значення набувають вони для тих, хто розуміє мову квітів. Вони гармонійно поєднуються з трояндами, хризантемами, гербери, орхідеями, ірисами, надаючи букету об`ємність і щільність. Після зрізання гілки альстромерії довго не втрачають привабливості.", 43, "./images/flowers/alstroemeriaRed.jpg");
    let flower4 = new Flower("Хризантема фіолетова", "фіолетова", "Хризантема носить назву «золотої квітки», воно не випадково. Хризантема значення квітки: в грецькому перекладі це буде «квітка-сонце», в латинському - «золотоцветная». Батьківщиною її є Китай і Японія. Спочатку була виведена хризантема з квітками яскравого жовтого кольору. В даний час селекціонери значно розширили різноманіття сортів, в даний час їх відомо близько 2000.", 35, "./images/flowers/chrysanthemumPurple.jpg");
    let flower5 = new Flower("Фрезія фіолетова", "фіолетова", "Квіти фрезії дають різноманітне значення, включаючи дружбу, невинність, задумливість, наполегливість та пихатість. На мові квітів традиційно використовувалися фрізії для передачі дружби. Сучасні флористи, відзначаючи його витончений зовнішній вигляд, рекомендують фрезії для того, хто витончений під тиском.", 35, "./images/flowers/freesiaPurple.jpg");
    let flower6 = new Flower("Хризантема біла", "біла", "Хризантема носить назву «золотої квітки», воно не випадково. Хризантема значення квітки: в грецькому перекладі це буде «квітка-сонце», в латинському - «золотоцветная». Батьківщиною її є Китай і Японія. Спочатку була виведена хризантема з квітками яскравого жовтого кольору. В даний час селекціонери значно розширили різноманіття сортів, в даний час їх відомо близько 2000.", 45, "./images/flowers/chrysanthemumWhite.jpg");
    let flower7 = new Flower("Хризантема жовта", "жовта", "Хризантема носить назву «золотої квітки», воно не випадково. Хризантема значення квітки: в грецькому перекладі це буде «квітка-сонце», в латинському - «золотоцветная». Батьківщиною її є Китай і Японія. Спочатку була виведена хризантема з квітками яскравого жовтого кольору. В даний час селекціонери значно розширили різноманіття сортів, в даний час їх відомо близько 2000.", 40, "./images/flowers/chrysanthemumYellow.jpg");
    let flower8 = new Flower("Ромашка біла", "біла", "Ромашка - один з найвідоміших і популярних квіток в світі. Це символ відродження весни і виразно один з найпопулярніших квіток. Тендітні, але в той же час сильні ромашки можуть цвісти в деяких регіонах круглий рік. Однак своєї кульмінації цвітіння ромашки досягають навесні, прикрашаючи луки і привносячи фарби в світ після сірої зими. Це проста, але безпомилково впізнавана квітка.", 35, "./images/flowers/daisyWhite.jpg");
    let flower9 = new Flower("Гербера помаранчева", "помаранчева", "З герберами пов’язано веселощі і радість, вони здатні дарувати посмішки. Саме цього багатьом і не вистачає в житті. Часом досить піднести одну герберу, щоб донести свій емоційний настрій і почуття. Одним із значень квітки гербера є — таємничість. Поряд зі скромністю гербера володіє надзвичайною витонченістю. Значення квітки гербера творче і життєстверджуюче. Вона вважається позитивним рослиною.", 50, "./images/flowers/gerberaOrange.jpg");
    let flower10 = new Flower("Гербера рожева", "рожева", "З герберами пов’язано веселощі і радість, вони здатні дарувати посмішки. Саме цього багатьом і не вистачає в житті. Часом досить піднести одну герберу, щоб донести свій емоційний настрій і почуття. Одним із значень квітки гербера є — таємничість. Поряд зі скромністю гербера володіє надзвичайною витонченістю. Значення квітки гербера творче і життєстверджуюче. Вона вважається позитивним рослиною.", 36, "./images/flowers/gerberaPink.jpg");
    let flower11 = new Flower("Гербера червона", "червона", "З герберами пов’язано веселощі і радість, вони здатні дарувати посмішки. Саме цього багатьом і не вистачає в житті. Часом досить піднести одну герберу, щоб донести свій емоційний настрій і почуття. Одним із значень квітки гербера є — таємничість. Поряд зі скромністю гербера володіє надзвичайною витонченістю. Значення квітки гербера творче і життєстверджуюче. Вона вважається позитивним рослиною.", 47, "./images/flowers/gerberaRed.jpg");
    let flower12 = new Flower("Гербера біла", "біла", "З герберами пов’язано веселощі і радість, вони здатні дарувати посмішки. Саме цього багатьом і не вистачає в житті. Часом досить піднести одну герберу, щоб донести свій емоційний настрій і почуття. Одним із значень квітки гербера є — таємничість. Поряд зі скромністю гербера володіє надзвичайною витонченістю. Значення квітки гербера творче і життєстверджуюче. Вона вважається позитивним рослиною.", 41, "./images/flowers/gerberaWhite.jpg");
    let flower13 = new Flower("Гербера жовта", "жовта", "З герберами пов’язано веселощі і радість, вони здатні дарувати посмішки. Саме цього багатьом і не вистачає в житті. Часом досить піднести одну герберу, щоб донести свій емоційний настрій і почуття. Одним із значень квітки гербера є — таємничість. Поряд зі скромністю гербера володіє надзвичайною витонченістю. Значення квітки гербера творче і життєстверджуюче. Вона вважається позитивним рослиною.", 39, "./images/flowers/gerberaYellow.jpg");
    let flower14 = new Flower("Гіацинт рожевий", "рожева", "Подарований букет цих квітів обіцяє перемоги і досягнення. Він є символом відродження і неймовірною радості. Ви зможете придбати гіацинти оптом в нашому флористичного салоні або порадувати кого-то невеликим букетом. Квітники підберуть відповідний до випадку колір і створять чарівні, запашні композицію.", 42, "./images/flowers/hyacinthPink.jpg");
    let flower15 = new Flower("Гіацинт фіолетовий", "фіолетова", "Подарований букет цих квітів обіцяє перемоги і досягнення. Він є символом відродження і неймовірною радості. Ви зможете придбати гіацинти оптом в нашому флористичного салоні або порадувати кого-то невеликим букетом. Квітники підберуть відповідний до випадку колір і створять чарівні, запашні композицію.", 45, "./images/flowers/hyacinthPurple.jpg");
    let flower16 = new Flower("Гіацинт білий", "біла", "Подарований букет цих квітів обіцяє перемоги і досягнення. Він є символом відродження і неймовірною радості. Ви зможете придбати гіацинти оптом в нашому флористичного салоні або порадувати кого-то невеликим букетом. Квітники підберуть відповідний до випадку колір і створять чарівні, запашні композицію.", 38, "./images/flowers/hyacinthWhite.jpg");
    let flower17 = new Flower("Лілія помаранчева", "помаранчева", "У давнину білосніжними ліліями прикрашали релігійні споруди, храми. Їх вплітали у вінки нареченим, клали в труну імператорів, використовували в обрядах. Лілія символізує швидкоплинність життя і швидке в’янення.", 49, "./images/flowers/lilyOrange.jpg");
    let flower18 = new Flower("Лілія рожева", "рожева", "У давнину білосніжними ліліями прикрашали релігійні споруди, храми. Їх вплітали у вінки нареченим, клали в труну імператорів, використовували в обрядах. Лілія символізує швидкоплинність життя і швидке в’янення.", 45, "./images/flowers/lilyPink.jfif");
    let flower19 = new Flower("Лілія червона", "червона", "У давнину білосніжними ліліями прикрашали релігійні споруди, храми. Їх вплітали у вінки нареченим, клали в труну імператорів, використовували в обрядах. Лілія символізує швидкоплинність життя і швидке в’янення.", 47, "./images/flowers/lilyRed.jpg");
    let flower20 = new Flower("Лілія біла", "біла", "У давнину білосніжними ліліями прикрашали релігійні споруди, храми. Їх вплітали у вінки нареченим, клали в труну імператорів, використовували в обрядах. Лілія символізує швидкоплинність життя і швидке в’янення.", 39, "./images/flowers/lilyWhite.jpg");
    let flower21 = new Flower("Лілія жовта", "жовта", "У давнину білосніжними ліліями прикрашали релігійні споруди, храми. Їх вплітали у вінки нареченим, клали в труну імператорів, використовували в обрядах. Лілія символізує швидкоплинність життя і швидке в’янення.", 41, "./images/flowers/lilyYellow.jfif");
    let flower22 = new Flower("Півонія біла", "біла", "Значення цього символу – не тільки любов, але і багатство, процвітання. Це національна квітка Китаю, там він відомий як «квітка багатства і честі». Він означає ласку, жіночу красу і любовні почуття юності.", 34, "./images/flowers/peonyWhite.jpg");
    let flower23 = new Flower("Півонія жовта", "жовта", "Значення цього символу – не тільки любов, але і багатство, процвітання. Це національна квітка Китаю, там він відомий як «квітка багатства і честі». Він означає ласку, жіночу красу і любовні почуття юності.", 36, "./images/flowers/peonyYellow.jpg");
    let flower24 = new Flower("Троянда помаранчева", "помаранчева", "Ще з давніх часів троянда означала визнання любові і вираження почуттів. Ще до епохи вікторіанства кількість троянд в букеті вибиралося , виходячи з релігійних традицій. Троянди дарують в радості і в горі, в розпачі і хвилини слави. Ми висловлюємо за допомогою троянд горе і радість, віддаємо данину і вітаємо новонароджених.", 48, "./images/flowers/roseOrange.png");
    let flower25 = new Flower("Троянда рожева", "рожева", "Ще з давніх часів троянда означала визнання любові і вираження почуттів. Ще до епохи вікторіанства кількість троянд в букеті вибиралося , виходячи з релігійних традицій. Троянди дарують в радості і в горі, в розпачі і хвилини слави. Ми висловлюємо за допомогою троянд горе і радість, віддаємо данину і вітаємо новонароджених.", 39, "./images/flowers/rosePink.jpeg");
    let flower26 = new Flower("Троянда червона", "червона", "Ще з давніх часів троянда означала визнання любові і вираження почуттів. Ще до епохи вікторіанства кількість троянд в букеті вибиралося , виходячи з релігійних традицій. Троянди дарують в радості і в горі, в розпачі і хвилини слави. Ми висловлюємо за допомогою троянд горе і радість, віддаємо данину і вітаємо новонароджених.", 44, "./images/flowers/roseRed.jpg");
    let flower27 = new Flower("Троянда біла", "біла", "Ще з давніх часів троянда означала визнання любові і вираження почуттів. Ще до епохи вікторіанства кількість троянд в букеті вибиралося , виходячи з релігійних традицій. Троянди дарують в радості і в горі, в розпачі і хвилини слави. Ми висловлюємо за допомогою троянд горе і радість, віддаємо данину і вітаємо новонароджених.", 35, "./images/flowers/roseWhite.jpg");
    let flower28 = new Flower("Троянда жовта", "жовта", "Ще з давніх часів троянда означала визнання любові і вираження почуттів. Ще до епохи вікторіанства кількість троянд в букеті вибиралося , виходячи з релігійних традицій. Троянди дарують в радості і в горі, в розпачі і хвилини слави. Ми висловлюємо за допомогою троянд горе і радість, віддаємо данину і вітаємо новонароджених.", 37, "./images/flowers/roseYellow.jpeg");
    let flower29 = new Flower("Соняшник жовтий", "жовта", "Мовою рослин, соняшник означає - стійкість, життєлюбність, оптимізм, віру в майбутнє, позитивний настрій, достаток, успіх і благополуччя. Також, значення квітки можна розглядати як прояв платонічної любові, без романтичного підтексту. Такі квіти дарують друзям, подругам, маленьким або зовсім юним дівчаткам, однокласницям на випускний бал.", 49, "./images/flowers/sunflowerYellow.png");
    let flower30 = new Flower("Тюльпан помаранчевий", "помаранчева", "Квітка, яка найбільше символізує любов, - тюльпан. Незалежно від казкового походження, яке зображує цю прекрасну квітку як наслідок розчарування кохання, в даний час вважається, що тюльпан являє собою саме найприємніші почуття: кохання, пристрасть, честь. Особливість тюльпана полягає в його відтінках. Існує більше сотні видів тюльпанів.", 50, "./images/flowers/tulipOrange.jpg");
    let flower31 = new Flower("Тюльпан рожевий", "рожева", "Квітка, яка найбільше символізує любов, - тюльпан. Незалежно від казкового походження, яке зображує цю прекрасну квітку як наслідок розчарування кохання, в даний час вважається, що тюльпан являє собою саме найприємніші почуття: кохання, пристрасть, честь. Особливість тюльпана полягає в його відтінках. Існує більше сотні видів тюльпанів.", 46, "./images/flowers/tulipPink.jpg");
    let flower32 = new Flower("Тюльпан червоний", "червона", "Квітка, яка найбільше символізує любов, - тюльпан. Незалежно від казкового походження, яке зображує цю прекрасну квітку як наслідок розчарування кохання, в даний час вважається, що тюльпан являє собою саме найприємніші почуття: кохання, пристрасть, честь. Особливість тюльпана полягає в його відтінках. Існує більше сотні видів тюльпанів.", 37, "./images/flowers/tulipRed.jfif");
    let flower33 = new Flower("Тюльпан білий", "біла", "Квітка, яка найбільше символізує любов, - тюльпан. Незалежно від казкового походження, яке зображує цю прекрасну квітку як наслідок розчарування кохання, в даний час вважається, що тюльпан являє собою саме найприємніші почуття: кохання, пристрасть, честь. Особливість тюльпана полягає в його відтінках. Існує більше сотні видів тюльпанів.", 36, "./images/flowers/tulipWhite.jpg");
    let flower34 = new Flower("Тюльпан жовтий", "жовта", "Квітка, яка найбільше символізує любов, - тюльпан. Незалежно від казкового походження, яке зображує цю прекрасну квітку як наслідок розчарування кохання, в даний час вважається, що тюльпан являє собою саме найприємніші почуття: кохання, пристрасть, честь. Особливість тюльпана полягає в його відтінках. Існує більше сотні видів тюльпанів.", 45, "./images/flowers/tulipYellow.jpg");

    flowersArray = [flower1, flower2, flower3, flower4, flower5, flower6, flower7, flower8, flower9, flower10, flower11, flower12, flower13, flower14, flower15, flower16, flower17, flower18, flower19, flower20, flower21, flower22, flower23, flower24, flower25, flower26, flower27, flower28, flower29, flower30, flower31, flower32, flower33, flower34];
}

function createCards(arr) {
    let cardDiv = document.getElementById("cardDiv");

    if (cardDiv.hasChildNodes()) {
        let item = cardDiv.lastElementChild;
        while (item) {
            cardDiv.removeChild(item);
            item = cardDiv.lastElementChild;
        }
    }

    let card, cardTop, flowerImg, cardBottom, flowerName, flowerPrice, chooseButton;

    for (let i = 0; i < arr.length; i++) {
        card = document.createElement("div");
        cardTop = document.createElement("div");
        flowerImg = document.createElement("img");
        cardBottom = document.createElement("div");
        flowerName = document.createElement("h5");
        flowerPrice = document.createElement("h5");
        chooseButton = document.createElement("button");

        card.id = "card";
        cardTop.id = "cardTop";
        flowerImg.alt = "flower";
        flowerImg.id = "flowerImg";
        flowerImg.setAttribute("src", arr[i].image);
        flowerImg.onclick = function () {
            openbox(document.getElementById("flowerPopup"));
            createFlowerPopup(document.getElementById("flowerPopup"), arr[i]);
        }
        cardBottom.id = "cardBottom";
        flowerName.id = "flowerName";
        flowerName.innerText = arr[i].name;
        flowerPrice.id = "flowerPrice";
        flowerPrice.innerText = arr[i].price + " грн";
        chooseButton.id = "chooseButton";
        chooseButton.innerText = "Обрати";
        chooseButton.onclick = function () {
            chooseItem(arr[i]);
        }

        cardTop.appendChild(flowerImg);
        card.appendChild(cardTop);
        cardBottom.appendChild(flowerName);
        cardBottom.appendChild(flowerPrice);
        cardBottom.appendChild(chooseButton);
        card.appendChild(cardBottom);
        document.getElementById("cardDiv").appendChild(card);
    }
}

function openbox(div) {
    div.style.display = 'block';
}

function createFlowerPopup(div, flower) {
    let content, close, divTop, divBottom, img, header, description, price, button;

    content = document.createElement("div");
    close = document.createElement("div");
    divTop = document.createElement("div");
    divBottom = document.createElement("div");
    img = document.createElement("img");
    header = document.createElement("h3");
    description = document.createElement("h5");
    price = document.createElement("h3");
    button = document.createElement("button");

    content.id = "content";
    close.id = "close";
    close.innerText = "×";
    close.onclick = function () {
        closePopup(div, content);
    }
    divTop.id = "divTop";
    divBottom.id = "divBottom";
    img.id = "flowerPopupImg";
    img.setAttribute("src", flower.image);
    img.alt = "flower";
    header.id = "popupHeader";
    header.innerText = flower.name;
    description.id = "flowerPopupDescription";
    description.innerText = flower.description;
    price.id = "flowerPopupPrice";
    price.innerText = flower.price + " грн";
    button.id = "choosePopupButton";
    button.innerText = "Обрати";
    button.onclick = function () {
        chooseItem(flower);
    }

    divTop.appendChild(img);
    divBottom.appendChild(header);
    divBottom.appendChild(description);
    divBottom.appendChild(price);
    divBottom.appendChild(button);
    content.appendChild(close);
    content.appendChild(divTop);
    content.appendChild(divBottom);
    div.appendChild(content);
}

function specifyFlowers() {
    let result = flowersArray.slice();

    result = filterColorsFlowers(result);
    result = filterPriceFlowers(result);
    result = findFlowers(result);
    result = sortFlowers(result);

    createCards(result);
}

function sortFlowers(arr) {
    let result = arr.slice();
    let selectBox = document.getElementById("sortButton");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue !== "rating") {
        if (selectedValue === "increaseAlphabet") {
            result.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        }
        if (selectedValue === "decreaseAlphabet") {
            result.sort(function (a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
        }
        if (selectedValue === "increasePrice") {
            result.sort(function (a, b) {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
        }
        if (selectedValue === "decreasePrice") {
            result.sort(function (a, b) {
                if (a.price < b.price) {
                    return 1;
                }
                if (a.price > b.price) {
                    return -1;
                }
                return 0;
            });
        }
    }
    return result;
}

function getColors() {
    let checkBoxRed = document.getElementById("red");
    let checkBoxPink = document.getElementById("pink");
    let checkBoxPurple = document.getElementById("purple");
    let checkBoxYellow = document.getElementById("yellow");
    let checkBoxOrange = document.getElementById("orange");
    let checkBoxWhite = document.getElementById("white");

    if (checkBoxRed.checked === true) {
        if (colors.includes("червона") === false)
            colors.push("червона");
    } else {
        if (colors.includes("червона")) {
            let deleted = _.remove(colors, function (n) { return n === "червона"; });
        }
    }

    if (checkBoxPink.checked === true) {
        if (colors.includes("рожева") === false)
            colors.push("рожева");
    } else {
        if (colors.includes("рожева")) {
            let deleted = _.remove(colors, function (n) { return n === "рожева"; });
        }
    }

    if (checkBoxPurple.checked === true) {
        if (colors.includes("фіолетова") === false)
            colors.push("фіолетова");
    } else {
        if (colors.includes("фіолетова")) {
            let deleted = _.remove(colors, function (n) { return n === "фіолетова"; });
        }
    }

    if (checkBoxYellow.checked === true) {
        if (colors.includes("жовта") === false)
            colors.push("жовта");
    } else {
        if (colors.includes("жовта")) {
            let deleted = _.remove(colors, function (n) { return n === "жовта"; });
        }
    }

    if (checkBoxOrange.checked === true) {
        if (colors.includes("помаранчева") === false)
            colors.push("помаранчева");
    } else {
        if (colors.includes("помаранчева")) {
            let deleted = _.remove(colors, function (n) { return n === "помаранчева"; });
        }
    }

    if (checkBoxWhite.checked === true) {
        if (colors.includes("біла") === false)
            colors.push("біла");
    } else {
        if (colors.includes("біла")) {
            let deleted = _.remove(colors, function (n) { return n === "біла"; });
        }
    }

    let uniq = [...new Set(colors)];
    return uniq;
}

function filterColorsFlowers(arr) {
    let uniq = getColors();
    let result = [];

    for (let i = 0; i < uniq.length; i++) {
        let newArr = arr.filter(flower => flower.color === uniq[i]);
        result = result.concat(newArr);
    }

    if (result.length === 0) {
        return arr;
    } else {
        return result;
    }
}

function filterPriceFlowers(arr) {
    let priceFrom = document.getElementById("priceFrom").value;
    let priceTo = document.getElementById("priceTo").value;

    if (priceFrom.length === 0) priceFrom = 0;
    if (priceTo.length === 0) priceTo = 100;

    let result = arr.filter(flower => flower.price >= priceFrom && flower.price <= priceTo);
    return result;
}

function findFlowers(arr) {
    let search = document.getElementById("search").value.toLowerCase();
    let result = [];

    if (search.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name.toLowerCase() === search || arr[i].color.toLowerCase() === search || arr[i].name.toLowerCase().split(/(\s+)/)[0] === search)
                result.push(arr[i]);
        }

        if (result.length > 0) return result;
    }
    return arr;
}






/* -------------------------------------------------- BOUQUETS */
let bouquetsArray = [];
let colorsB = [];
let flowers = [];

function Bouquet(name, colors, flowers, date, price, image) {
    this.name = name;
    this.colors = colors;
    this.flowers = flowers;
    this.date = date;
    this.price = price;
    this.image = image;
    this.type = "bouquet";
}

function createBouquets() {
    let bouquet1 = new Bouquet("'Преміум' 25 троянд", ["рожевий", "білий"], ["троянда"], new Date('2021-11-23'), 750, "./images/bouquets/bouquet1.png");
    let bouquet2 = new Bouquet("'Веселка' 11 гербер", ["рожевий", "білий", "червоний", "помаранчевий", "жовтий"], ["гербера"], new Date('2021-12-02'), 600, "./images/bouquets/bouquet2.jpg");
    let bouquet3 = new Bouquet("'Ніжність' 19 тюльпанів", ["білий"], ["тюльпан"], new Date('2021-12-03'), 1100, "./images/bouquets/bouquet3.jpg");
    let bouquet4 = new Bouquet("'Сонце' 9 соняшників", ["жовтий"], ["соняшник"], new Date('2021-12-10'), 800, "./images/bouquets/bouquet4.jpg");
    let bouquet5 = new Bouquet("'Афродіта' 35 тюльпанів", ["червоний"], ["тюльпан"], new Date('2021-12-01'), 1000, "./images/bouquets/bouquet5.png");
    let bouquet6 = new Bouquet("'Гармонія' 11 хризантем", ["білий"], ["хризантема"], new Date('2021-12-05'), 900, "./images/bouquets/bouquet6.jpg");
    let bouquet7 = new Bouquet("'Бізнес' 11 троянд", ["червоний"], ["троянда"], new Date('2021-12-06'), 850, "./images/bouquets/bouquet7.jpg");
    let bouquet8 = new Bouquet("'Захоплення' 7 троянд", ["рожевий"], ["троянда"], new Date('2021-12-02'), 1300, "./images/bouquets/bouquet8.jpg");
    let bouquet9 = new Bouquet("'Діамант' 31 хризантема", ["рожевий", "білий", "фіолетовий"], ["хризантема"], new Date('2021-12-09'), 700, "./images/bouquets/bouquet9.png");
    let bouquet10 = new Bouquet("'Білосніжка' 15 лілій", ["білий"], ["лілія"], new Date('2021-12-07'), 1000, "./images/bouquets/bouquet10.jpg");
    let bouquet11 = new Bouquet("'Грація'", ["білий", "рожевий"], ["троянда", "фрезія"], new Date('2021-11-30'), 650, "./images/bouquets/bouquet11.jpg");
    let bouquet12 = new Bouquet("'Кохання' 39 троянд", ["білий", "рожевий"], ["троянда"], new Date('2021-11-29'), 1150, "./images/bouquets/bouquet12.jpg");
    let bouquet13 = new Bouquet("'Розкіш' 9 півоній", ["рожевий"], ["півонія"], new Date('2021-12-05'), 1050, "./images/bouquets/bouquet13.jpg");
    let bouquet14 = new Bouquet("'Бажання' 13 гербер", ["червоний"], ["гербера"], new Date('2021-11-28'), 1100, "./images/bouquets/bouquet14.jpg");
    let bouquet15 = new Bouquet("'Оригінальність'", ["білий", "фіолетовий"], ["альстромерія", "піон"], new Date('2021-12-06'), 1300, "./images/bouquets/bouquet15.jpg");
    let bouquet16 = new Bouquet("'Літо' 23 ромашки", ["білий"], ["ромашка"], new Date('2021-11-28'), 950, "./images/bouquets/bouquet16.jpg");
    let bouquet17 = new Bouquet("'Весна' 15 гіацинтів", ["білий", "рожевий", "фіолетовий"], ["гіацинт"], new Date('2021-12-09'), 1250, "./images/bouquets/bouquet17.jpg");
    let bouquet18 = new Bouquet("'Мікс'", ["білий"], ["ромашка", "півонія"], new Date('2021-12-08'), 1200, "./images/bouquets/bouquet18.jpg");
    let bouquet19 = new Bouquet("'Версаль'", ["фіолетовий", "білий", "рожевий"], ["гіацинт", "тюльпан"], new Date('2021-11-25'), 1000, "./images/bouquets/bouquet19.jpg");
    let bouquet20 = new Bouquet("'Захват'", ["білий", "рожевий"], ["лілія", "троянда"], new Date('2021-12-05'), 800, "./images/bouquets/bouquet20.jpg");

    bouquetsArray = [bouquet1, bouquet2, bouquet3, bouquet4, bouquet5, bouquet6, bouquet7, bouquet8, bouquet9, bouquet10, bouquet11, bouquet12, bouquet13, bouquet14, bouquet15, bouquet16, bouquet17, bouquet18, bouquet19, bouquet20];
}

function createCardsB(arr) {
    let cardDiv = document.getElementById("cardDivB");

    if (cardDiv.hasChildNodes()) {
        let item = cardDiv.lastElementChild;
        while (item) {
            cardDiv.removeChild(item);
            item = cardDiv.lastElementChild;
        }
    }

    let card, cardTop, bouquetImg, cardBottom, bouquetName, bouquetPrice, chooseButton;

    for (let i = 0; i < arr.length; i++) {
        card = document.createElement("div");
        cardTop = document.createElement("div");
        bouquetImg = document.createElement("img");
        cardBottom = document.createElement("div");
        bouquetName = document.createElement("h5");
        bouquetPrice = document.createElement("h5");
        chooseButton = document.createElement("button");

        card.id = "cardB";
        cardTop.id = "cardTopB";
        bouquetImg.alt = "bouquet";
        bouquetImg.id = "bouquetImg";
        bouquetImg.setAttribute("src", arr[i].image);
        cardBottom.id = "cardBottomB";
        bouquetName.id = "bouquetName";
        bouquetName.innerText = arr[i].name;
        bouquetPrice.id = "bouquetPrice";
        bouquetPrice.innerText = arr[i].price + " грн";
        chooseButton.id = "chooseButtonB";
        chooseButton.innerText = "Обрати";
        chooseButton.onclick = function () {
            chooseItem(arr[i]);
        }

        cardTop.appendChild(bouquetImg);
        card.appendChild(cardTop);
        cardBottom.appendChild(bouquetName);
        cardBottom.appendChild(bouquetPrice);
        cardBottom.appendChild(chooseButton);
        card.appendChild(cardBottom);
        document.getElementById("cardDivB").appendChild(card);
    }
}

function specifyBouquets() {
    let result = bouquetsArray.slice();

    result = filterFlowersBouquets(result);
    result = filterColorsBouquets(result);
    result = filterPriceBouquets(result);
    result = findBouquets(result);
    result = sortBouquets(result);

    createCardsB(result);
}

function sortBouquets(arr) {
    let result = arr.slice();
    let selectBox = document.getElementById("sortButtonB");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue !== "rating") {
        if (selectedValue === "new") {
            result.sort(function (a, b) {
                if (a.date < b.date) {
                    return 1;
                }
                if (a.date > b.date) {
                    return -1;
                }
                return 0;
            });
        }
        if (selectedValue === "increasePrice") {
            result.sort(function (a, b) {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
        }
        if (selectedValue === "decreasePrice") {
            result.sort(function (a, b) {
                if (a.price < b.price) {
                    return 1;
                }
                if (a.price > b.price) {
                    return -1;
                }
                return 0;
            });
        }
    }
    return result;
}

function getFlowers() {
    let checkBoxAlstromeria = document.getElementById("alstromeria");
    let checkBoxGerbera = document.getElementById("gerbera");
    let checkBoxHyacinth = document.getElementById("hyacinth");
    let checkBoxLily = document.getElementById("lily");
    let checkBoxPeony = document.getElementById("peony");
    let checkBoxDaisy = document.getElementById("daisy");
    let checkBoxSunflower = document.getElementById("sunflower");
    let checkBoxRose = document.getElementById("rose");
    let checkBoxTulip = document.getElementById("tulip");
    let checkBoxFreesia = document.getElementById("freesia");
    let checkBoxChrysanthemum = document.getElementById("chrysanthemum");

    if (checkBoxAlstromeria.checked === true) {
        if (flowers.includes("альстромерія") === false)
            flowers.push("альстромерія");
    } else {
        if (flowers.includes("альстромерія")) {
            let deleted = _.remove(flowers, function (n) { return n === "альстромерія"; });
        }
    }

    if (checkBoxGerbera.checked === true) {
        if (flowers.includes("гербера") === false)
            flowers.push("гербера");
    } else {
        if (flowers.includes("гербера")) {
            let deleted = _.remove(flowers, function (n) { return n === "гербера"; });
        }
    }

    if (checkBoxHyacinth.checked === true) {
        if (flowers.includes("гіацинт") === false)
            flowers.push("гіацинт");
    } else {
        if (flowers.includes("гіацинт")) {
            let deleted = _.remove(flowers, function (n) { return n === "гіацинт"; });
        }
    }

    if (checkBoxLily.checked === true) {
        if (flowers.includes("лілія") === false)
            flowers.push("лілія");
    } else {
        if (flowers.includes("лілія")) {
            let deleted = _.remove(flowers, function (n) { return n === "лілія"; });
        }
    }

    if (checkBoxPeony.checked === true) {
        if (flowers.includes("півонія") === false)
            flowers.push("півонія");
    } else {
        if (flowers.includes("півонія")) {
            let deleted = _.remove(flowers, function (n) { return n === "півонія"; });
        }
    }

    if (checkBoxDaisy.checked === true) {
        if (flowers.includes("ромашка") === false)
            flowers.push("ромашка");
    } else {
        if (flowers.includes("ромашка")) {
            let deleted = _.remove(flowers, function (n) { return n === "ромашка"; });
        }
    }

    if (checkBoxSunflower.checked === true) {
        if (flowers.includes("соняшник") === false)
            flowers.push("соняшник");
    } else {
        if (flowers.includes("соняшник")) {
            let deleted = _.remove(flowers, function (n) { return n === "соняшник"; });
        }
    }

    if (checkBoxRose.checked === true) {
        if (flowers.includes("троянда") === false)
            flowers.push("троянда");
    } else {
        if (flowers.includes("троянда")) {
            let deleted = _.remove(flowers, function (n) { return n === "троянда"; });
        }
    }

    if (checkBoxTulip.checked === true) {
        if (flowers.includes("тюльпан") === false)
            flowers.push("тюльпан");
    } else {
        if (flowers.includes("тюльпан")) {
            let deleted = _.remove(flowers, function (n) { return n === "тюльпан"; });
        }
    }

    if (checkBoxFreesia.checked === true) {
        if (flowers.includes("фрезія") === false)
            flowers.push("фрезія");
    } else {
        if (flowers.includes("фрезія")) {
            let deleted = _.remove(flowers, function (n) { return n === "фрезія"; });
        }
    }

    if (checkBoxChrysanthemum.checked === true) {
        if (flowers.includes("хризантема") === false)
            flowers.push("хризантема");
    } else {
        if (flowers.includes("хризантема")) {
            let deleted = _.remove(flowers, function (n) { return n === "хризантема"; });
        }
    }

    let uniq = [...new Set(flowers)];
    return uniq;
}

function filterFlowersBouquets(arr) {
    let bouquetFlowers = getFlowers();
    let result = [];

    for (let i = 0; i < bouquetFlowers.length; i++) {
        let newArr = arr.filter(bouquet => bouquet.flowers.includes(bouquetFlowers[i]) === true);
        result = result.concat(newArr);
    }

    let uniq = [...new Set(result)];

    if (uniq.length === 0) {
        return arr;
    } else {
        return uniq;
    }
}

function getColorsB() {
    let checkBoxRed = document.getElementById("redB");
    let checkBoxPink = document.getElementById("pinkB");
    let checkBoxPurple = document.getElementById("purpleB");
    let checkBoxYellow = document.getElementById("yellowB");
    let checkBoxOrange = document.getElementById("orangeB");
    let checkBoxWhite = document.getElementById("whiteB");

    if (checkBoxRed.checked === true) {
        if (colorsB.includes("червоний") === false)
            colorsB.push("червоний");
    } else {
        if (colorsB.includes("червоний")) {
            let deleted = _.remove(colorsB, function (n) { return n === "червоний"; });
        }
    }

    if (checkBoxPink.checked === true) {
        if (colorsB.includes("рожевий") === false)
            colorsB.push("рожевий");
    } else {
        if (colorsB.includes("рожевий")) {
            let deleted = _.remove(colorsB, function (n) { return n === "рожевий"; });
        }
    }

    if (checkBoxPurple.checked === true) {
        if (colorsB.includes("фіолетовий") === false)
            colorsB.push("фіолетовий");
    } else {
        if (colorsB.includes("фіолетовий")) {
            let deleted = _.remove(colorsB, function (n) { return n === "фіолетовий"; });
        }
    }

    if (checkBoxYellow.checked === true) {
        if (colorsB.includes("жовтий") === false)
            colorsB.push("жовтий");
    } else {
        if (colorsB.includes("жовтий")) {
            let deleted = _.remove(colorsB, function (n) { return n === "жовтий"; });
        }
    }

    if (checkBoxOrange.checked === true) {
        if (colorsB.includes("помаранчевий") === false)
            colorsB.push("помаранчевий");
    } else {
        if (colorsB.includes("помаранчевий")) {
            let deleted = _.remove(colorsB, function (n) { return n === "помаранчевий"; });
        }
    }

    if (checkBoxWhite.checked === true) {
        if (colorsB.includes("білий") === false)
            colorsB.push("білий");
    } else {
        if (colorsB.includes("білий")) {
            let deleted = _.remove(colorsB, function (n) { return n === "білий"; });
        }
    }

    let uniq = [...new Set(colorsB)];
    return uniq;
}

function filterColorsBouquets(arr) {
    let bouquetColors = getColorsB();
    let result = [];

    for (let i = 0; i < bouquetColors.length; i++) {
        let newArr = arr.filter(bouquet => bouquet.colors.includes(bouquetColors[i]) === true);
        result = result.concat(newArr);
    }

    let uniq = [...new Set(result)];

    if (uniq.length === 0) return arr;
    else return uniq;
}

function filterPriceBouquets(arr) {
    let priceFrom = document.getElementById("priceFromB").value;
    let priceTo = document.getElementById("priceToB").value;

    if (priceFrom.length === 0) priceFrom = 0;
    if (priceTo.length === 0) priceTo = 10000;

    let result = arr.filter(bouquet => bouquet.price >= priceFrom && bouquet.price <= priceTo);
    return result;
}

function findBouquets(arr) {
    let search = document.getElementById("searchB").value.toLowerCase();
    let result = [];

    if (search.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let str = arr[i].name.toLowerCase();
            if (str.indexOf(search) > -1 || str.indexOf(search.substring(0, search.length - 2)) > -1)
                result.push(arr[i]);
        }
        if (result.length > 0) return result;
    }
    return arr;
}




/* -------------------------------------------------- CONTACTS */
function createMap() {
    let latitude = 50.4642901;
    let longitude = 30.5192957;
    let mapOptions = {
        center: [latitude, longitude],
        zoom: 18
    }

    let map = new L.map("leftContacts", mapOptions);
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    var marker = L.marker([latitude, longitude]);
    marker.bindPopup("latitude: " + latitude + ", longitude: " + longitude).openPopup();
    marker.addTo(map);
}
