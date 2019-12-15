# Assignment 2 - Web App Development 2.  
Student No. 20086418  
Name: Chengfeng Pan  

Youtube link: https://youtu.be/SzNaW_nC7NA
## Vue App  
Github: https://github.com/pcf1998/tracingsVueWebApp  
 
>ATTENTION you need to allow the unsafe scripts on your browser  

Firebase: https://tracingsweb-pcf.firebaseapp.com/ 

### Project description
Now, if people can visualize the progress of the workflow, it will greatly improve office efficiency and provide targeted questions for phased project reports. So I develop this web app for people to manage their projects. It can save people a lot of time and money.  

### Cypress Test Execution  
https://dashboard.cypress.io/projects/xx3zur/runs  

### Vue App CICD  
https://gitlab.com/pcf1998/tracingsvue-cicd    

### About Api
Except use my tracingswebapi to realize the most part of my web app, I also used third-party APIs to enrich the functionality of the application and bring a better experience to users.  
> web page background music  
>>https://api.uomg.com/api/rand.music  
>it will auto play music which is very popular now

> IP address
>>http://ifconfig.me/ip  
>it will get your Public IP address

> Detailed address 
>>https://ipapi.co/  
>it will return a very detailed address information by ip address

>real-time currency information 
>>http://www.apilayer.net/api/live?access_key={}
>it will get real-time currency information about $ to any other currencies

>weather report  
>>http://api.openweathermap.org/data/2.5/weather?lat={}}&lon={}&APPID={}  
>it will get weather information by your address (longitude and latitude)  

### About  UML Diagrams & use cases  
>class diagram  
![][11]  
>task use case
![][12]  
>team use case
![][13]  
>project use case
![][14]  
>Activity diagram of process a new project
![][15]  
>Application architecture  
![][16]  


## Web API  
Github: https://github.com/pcf1998/tracingsWebApi  
Heroku: https://tracingswebapi.herokuapp.com/

### web API test coverage report  
https://gitlab.com/pcf1998/tracings-cicd/blob/master/README.md

### Web API CICD 
https://gitlab.com/pcf1998/tracings-cicd  

## Screenshot 
![][17]

>allows the user to login  
>get user's public ip address  
>get currency information  
>get user's address  
>get user's local weather  

![][1]

>allows the user add a new project    
>delete a project  
>edit a project  
>display a project  


![][2]

>allows the user to select a project  
>add a new stage  
>delete a stage    

![][3]

>allows the user to edit a stage  

![][4]
>allows the user to edit a task name, status, task content  

![][5]  
![][18]  

>allows the user to display team members  
>allows the user to add a team

![][6]
>allows the user to edit a team  


![][8]
>allows the user to display task  


![][9]
>allows the user to display staff   


![][10]
>allows the user to add a project

[1]: ./img/projects.png  
[2]: ./img/displayproject1.png  
[3]: ./img/displayproject2.png 
[4]: ./img/displayproject3.png
[5]: ./img/displayproject4.png 
[6]: ./img/2019-12-1522.41.28.png  
[7]: ./img/displayteam2.png 
[8]: ./img/2019-12-1522.40.18.png  
[9]: ./img/staff.png  
[10]: ./img/addproject.png
[11]: ./img/class.png
[12]: ./img/task.png
[13]: ./img/team.png
[14]: ./img/project.png
[15]: ./img/activity.png
[16]: ./img/arch.png
[17]: ./img/2019-12-1522.35.47.png
[18]: ./img/2019-12-1523.16.53.png
