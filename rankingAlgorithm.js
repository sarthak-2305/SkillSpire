// Defining constants
const PDL_WEIGHT = 0.2; // Paper Difficulty Level weight
const AS_WEIGHT = 0.2; // Average Score weight
const IR_WEIGHT = 0.2; // Improvement Rate weight
const COURSE_WEIGHT = 0.2; // Course weight
const CD_WEIGHT = 0.2; // Course Difficulty weight

// Defining data structures
const students = [];
const professionals = {
  tech: [],
  management: [],
};

function addStudentData(studentId, gradeLevel, courseId, courseDifficulty, paperDifficulty, studentScore, averageScore, previousAverageScore) {
  const improvementRate = previousAverageScore === 0 ? 0 : (averageScore - previousAverageScore) / previousAverageScore;
  const scaledPaperDifficulty = (paperDifficulty - 1) / 9;
  const scaledStudentScore = studentScore / 100;
  const scaledImprovementRate = improvementRate / 100;
  const scaledCourseDifficulty = (courseDifficulty - 1) / 9; // Assuming course difficulty also from 1 to 10
  const scaledCourseWeight = gradeLevel === 'college' ? 1 : 0.5; // Assume college courses have more weight

  const score = PDL_WEIGHT * scaledPaperDifficulty + AS_WEIGHT * scaledStudentScore + IR_WEIGHT * scaledImprovementRate + COURSE_WEIGHT * scaledCourseWeight + CD_WEIGHT * scaledCourseDifficulty;

  const studentData = {
    studentId,
    gradeLevel,
    courseId,
    courseDifficulty,
    paperDifficulty,
    studentScore,
    averageScore,
    previousAverageScore,
    score,
  };

  students.push(studentData);
}

function addProfessionalData(professionalId, category, salary, position, company, projects, awards) {
  const scaledSalary = (salary - 50000) / 150000;
  const scaledPosition = position === 'CEO' ? 1 : position === 'Manager' ? 0.75 : position === 'Engineer' ? 0.5 : 0.25; // Assume different roles have different weightage
  const scaledProjects = projects / 10;
  const scaledAwards = awards / 5;

  const score = scaledSalary + scaledPosition + scaledProjects + scaledAwards;

  const professionalData = {
    professionalId,
    category,
    salary,
    position,
    company,
    projects,
    awards,
    score,
  };

  // Separate professionals based on their category
  if (category === 'tech') {
    professionals.tech.push(professionalData);
  } else if (category === 'management') {
    professionals.management.push(professionalData);
  }
}

// Function to assign rank based on score
function assignRanks(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].rank = i + 1;

    // Assign tiers based on rank
    if (i / data.length <= 0.10) {
      data[i].tier = 'Platinum';
    } else if (i / data.length <= 0.25) {
      data[i].tier = 'Gold';
    } else if (i / data.length <= 0.45) {
      data[i].tier = 'Silver';
    } else if (i / data.length <= 0.75) {
      data[i].tier = 'Bronze';
    } else {
      data[i].tier = 'Iron';
    }
  }
}

// Function to print the leaderboard
function printLeaderboard(category) {
  // Determine which group to sort and print
  let group = [];
  let idField = '';
  if (category === 'students') {
    group = students;
    idField = 'studentId';
  } else if (category === 'tech') {
    group = professionals.tech;
    idField = 'professionalId';
  } else if (category === 'management') {
    group = professionals.management;
    idField = 'professionalId';
  }

  // Sort the group based on their score in descending order
  group.sort((a, b) => b.score - a.score);

  // Assign ranks and tiers
  assignRanks(group);

  console.log(`--- ${category.charAt(0).toUpperCase() + category.slice(1)} Leaderboard ---`);
  console.log();

  for (let i = 0; i < group.length; i++) {
    const entry = group[i];
    console.log(`Rank ${entry.rank} | ${idField}: ${entry[idField]} | Score: ${entry.score.toFixed(2)} | Tier: ${entry.tier}`);
  }

  console.log();
}

// Function to generate random number between a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate student data
function generateStudentData() {
  const gradeLevels = ['college', 'school'];
  const courses = ['Math', 'Science', 'Arts', 'Computer Science'];

  for (let i = 0; i < 100; i++) {
    const studentId = `S${i}`;
    const gradeLevel = gradeLevels[getRandomNumber(0, gradeLevels.length - 1)];
    const courseId = courses[getRandomNumber(0, courses.length - 1)];
    const courseDifficulty = getRandomNumber(1, 10);
    const paperDifficulty = getRandomNumber(1, 10);
    const studentScore = getRandomNumber(1, 100);
    const averageScore = getRandomNumber(1, 100);
    const previousAverageScore = getRandomNumber(0, averageScore);

    addStudentData(studentId, gradeLevel, courseId, courseDifficulty, paperDifficulty, studentScore, averageScore, previousAverageScore);
  }
}

// Function to generate professional data
function generateProfessionalData() {
  const categories = ['tech', 'management'];
  const positions = ['Intern', 'Employee', 'Manager', 'CEO'];
  const companies = ['Company A', 'Company B', 'Company C'];

  for (let i = 0; i < 100; i++) {
    const professionalId = `P${i}`;
    const category = categories[getRandomNumber(0, categories.length - 1)];
    const salary = getRandomNumber(50000, 200000);
    const position = positions[getRandomNumber(0, positions.length - 1)];
    const company = companies[getRandomNumber(0, companies.length - 1)];
    const projects = getRandomNumber(0, 10);
    const awards = getRandomNumber(0, 5);

    addProfessionalData(professionalId, category, salary, position, company, projects, awards);
  }
}

// Generate random data
generateStudentData();
generateProfessionalData();

// Print the leaderboards
printLeaderboard('students');
printLeaderboard('tech');
printLeaderboard('management');
