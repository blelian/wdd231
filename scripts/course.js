document.addEventListener('DOMContentLoaded', function () {
  const mainElement = document.querySelector('main');
  if (!mainElement) return;

  const cardSections = mainElement.querySelectorAll('.card');
  if (cardSections.length === 0) return;

  const targetSection = cardSections[cardSections.length - 1];

  const buttonContainer = document.createElement('div');
  buttonContainer.style.textAlign = 'center';
  buttonContainer.style.marginTop = '10px';
  buttonContainer.style.borderBottom = '2px solid';
  buttonContainer.style.paddingBottom = '10px';

  const buttons = [
    { label: 'ALL', value: 'all' },
    { label: 'CSE', value: 'cse' },
    { label: 'WDD', value: 'wdd' }
  ];

  let currentFilter = 'all';

  buttons.forEach(buttonData => {
    const button = document.createElement('button');
    button.textContent = buttonData.label;
    button.value = buttonData.value;
    button.classList.add('rounded-button');
    button.style.padding = '0.5rem 4rem';
    buttonContainer.appendChild(button);

    button.addEventListener('click', function () {
      currentFilter = buttonData.value;
      updateCourseDisplay();
    });
  });

  targetSection.appendChild(buttonContainer);

  const buttonColor = window.getComputedStyle(document.querySelector('.rounded-button')).backgroundColor;
  buttonContainer.style.borderColor = buttonColor;

  const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.', technology: ['Python'], completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.', technology: ['HTML', 'CSS'], completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.', technology: ['Python'], completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.', technology: ['C#'], completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.', technology: ['HTML', 'CSS', 'JavaScript'], completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.', technology: ['HTML', 'CSS', 'JavaScript'], completed: false }
  ];

  function updateCourseDisplay() {
    const existingCourseButtonContainer = document.getElementById('courseButtonContainer');
    if (existingCourseButtonContainer) existingCourseButtonContainer.remove();

    const existingCourseCountDisplay = document.getElementById('courseCountDisplay');
    if (existingCourseCountDisplay) existingCourseCountDisplay.remove();

    const filteredCourses = courses.filter(course => {
      if (currentFilter === 'all') return true;
      return course.subject.toLowerCase() === currentFilter;
    });

    const courseButtonContainer = document.createElement('div');
    courseButtonContainer.style.textAlign = 'center';
    courseButtonContainer.style.marginTop = '10px';
    courseButtonContainer.id = 'courseButtonContainer';

    const courseCountDisplay = document.createElement('p');
    courseCountDisplay.textContent = `Number of displayed courses: ${filteredCourses.length}`;
    courseCountDisplay.id = 'courseCountDisplay';
    courseCountDisplay.style.textAlign = 'center';
    courseCountDisplay.style.marginTop = '10px';
    courseCountDisplay.style.color = 'black';
    courseCountDisplay.style.fontSize = '16px';
    courseCountDisplay.style.fontStyle = 'italic';
    courseCountDisplay.style.fontWeight = 'bold';
    targetSection.appendChild(courseCountDisplay);

    let currentRow;
    filteredCourses.forEach((course, index) => {
      if (index % 3 === 0) {
        currentRow = document.createElement('div');

        if (!window.matchMedia("(max-width: 768px)").matches) {
          currentRow.style.display = 'flex';
          currentRow.style.justifyContent = 'space-around';
        }

        currentRow.style.width = '100%';
        courseButtonContainer.appendChild(currentRow);
      }

      const courseButton = document.createElement('button');
      courseButton.textContent = `${course.subject} ${course.number}: ${course.title}`;
      courseButton.style.padding = '1rem';
      courseButton.style.margin = '0.5rem';
      courseButton.style.borderRadius = '5px';
      courseButton.style.fontSize = '1em';
      courseButton.style.flexGrow = '1';
      courseButton.style.maxWidth = '30%';
      courseButton.style.boxSizing = 'border-box';
      courseButton.style.fontWeight = 'bold';
      courseButton.style.border = '2px solid #333';

      if (course.completed) {
        courseButton.style.backgroundColor = '#66301D';
        courseButton.style.color = 'white';
      } else {
        courseButton.style.backgroundColor = '#dad6d4';
        courseButton.style.color = '#333';
      }

      currentRow.appendChild(courseButton);
    });

    targetSection.appendChild(courseButtonContainer);

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    displayTotalCredits(totalCredits);
  }

  function displayTotalCredits(totalCredits) {
    const existingCreditDisplay = document.getElementById('totalCreditsDisplay');
    if (existingCreditDisplay) existingCreditDisplay.remove();

    const creditDisplay = document.createElement('p');
    creditDisplay.innerHTML = `<b>Total Credits: ${totalCredits}</b>`;
    creditDisplay.style.textAlign = 'center';
    creditDisplay.style.marginTop = '10px';
    creditDisplay.id = 'totalCreditsDisplay';
    targetSection.appendChild(creditDisplay);
  }

  updateCourseDisplay();
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
      completed: false
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
]