const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menu = document.querySelector('#menu');
const nav = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('nav a');
const all = document.querySelector('#all');
const cse = document.querySelector('#cse');
const wdd = document.querySelector('#wdd');
const weatherIcon = document.querySelector('#weather-icon');
const iconCaption = document.querySelector('#icon-caption');
const currentTemp = document.querySelector('#current-temp');

const lat = 40.29678579996306; 
const long = -111.69417527604703;

weatherUrl = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=e4745822e1d8fb82087c4494c8088642`;

const today = new Date();

let todayFormatted = today.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

currentYear.innerHTML = `©️ ${today.getFullYear()} | Erin Major | Utah, USA`;
lastModified.innerHTML = `Last Modified: ${todayFormatted}`;

const currentPath = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');

    if (linkPath === currentPath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

menu.addEventListener('click', () => {
    menu.classList.toggle("open");
    nav.classList.toggle("open");
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

function displayCourses(filteredCourses) {
    document.querySelector('#courses').innerHTML = "";
    const html = filteredCourses.map(
        (course) => ` <figure id="course-${course.number}">
            <p>${course.subject} ${course.number}</p>
            </figure>`
    );
    document.querySelector('#courses').innerHTML = html.join("");
    changeCourseColor(filteredCourses);
    let remainingCredits = calculateRequired(filteredCourses);
    document.querySelector('#remainingCredits').innerHTML = `You have ${remainingCredits} of these credits left before you earn your certificate!`;
};

function changeCourseColor(filteredCourses) {
    filteredCourses.forEach(course => {
        if(course.completed == true) {
            document.querySelector(`#course-${course.number}`).classList.toggle("completed");
        };
    });
};

function calculateRequired(filteredCourses) {
    return filteredCourses.reduce((accumaltor, course) => {
        if(course.completed == false) {
            return accumaltor + course.credits;
        }
        return accumaltor;  
    }, 0);
};

async function fetchApi(url) {
    try {
        const response = await fetch(url);       
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    } 
}

function displayWeather(data) {
    let iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let description = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', description);
    iconCaption.innerHTML = description;
    currentTemp.innerHTML = `The current temp is ${data.main.temp}&deg; F.`;
}

displayCourses(courses);
fetchApi(weatherUrl);

all.addEventListener('click', () => {
    displayCourses(courses);
    all.classList.add('selected');
    cse.classList.remove('selected');
    wdd.classList.remove('selected');
});

cse.addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject == "CSE"));
    cse.classList.add('selected');
    all.classList.remove('selected');
    wdd.classList.remove('selected');
});

wdd.addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject == "WDD"));
    wdd.classList.add('selected');
    cse.classList.remove('selected');
    all.classList.remove('selected');
});