//## store forms in these variables to avoid unacessary server requests
var globalExperienceForm = false;
var globalEducationForm = false;
var globalLanguageForm = false;

//## ready flags during initiation process
var experienceReady = false;
var educationReady = false;
var languageReady = false;

//## If user is editing a form set it to true
var globalEditingExperience = false;
var globalEditingEducation = false;
var globalEditingLanguage = false;

//## Globals to effects control
var globalOpacity = parseFloat(1); 
var lastSetTimeOut ;

