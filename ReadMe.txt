blackboardcoursesforuser

This application can be use to register a proxy tool that requests access to the 
Blackboard Learn 9.1 Context and Courses web services.

After the proxy tool is registered with your Blackboard installation, a
Blackboard system administrator must authorize the proxy tool.

Then you can use this application to initialize a session with a Blackboard
installation, login to Blackboard, and use the Context and Courses web services
to get a list of course names a particular Blackboard user is enrolled in.

If you are not familiar with proxy tools and Blackboard Learn 9.1 
web services review the tutorials at http://www.brucephillips.name/blog/index.cfm/2011/6/8/Blackboard-Learn-91-Web-Services-Tutorials-and-Documentation. 

Eclipse Instructions

If you are using Eclipse with the Maven m2eclipse plugin then you can 
import this project into Eclipse and run the application from within
Eclipse.

To import the project into Eclipse do the following in an Eclipse
work space.

Select File - Import
Under the General Folder - Select Existing Projects Into Workspace
Click on the radio button for Select archive file and browse to where you downloaded the
zipped project archive.
Select that zipped project archive
The project name should appear in the Projects window.
Select OK to import the project into your Eclipse workspace

Before running this application you must provide values for the properties
in src/main/resources/bbws.properties.  An explanation for each property 
is provided in the bbws.properties file.

There are two Java classes that can be run as Java applications.

RegisterProxyToolApp - registers the proxy tool specified in bbws.properties with your Blackboard application
BlackboardCoursesForUserApp - uses the proxy tool to login to your Blackboard application's web services and get
the Blackboard courses a user is enrolled in.

The RegisterProxyToolApp must be run first and is only run once.

To run the RegisterProxyToolApp within Eclipse right click on 
src/main/java/edu/ku/it/si/registerproxytool/app/RegisterProxyToolApp.java 
and select Run As - Java Application 

The results of running the program will display in the Console window.

Then follow the instructions in the documentation folder for how to 
authorize the proxy tool in your Blackboard application.

After authorizing the proxy tool you can run the BlackboardCoursesForUserApp.

To run the BlackboardCoursesForUserApp within Eclipse right click on 
src/main/java/edu/ku/it/si/blackboardcoursesforuser/app/BlackboardCoursesForUserApp and select 
Run As - Java Application

The results of running the program will display in the Console window. 


Maven Only Instructions

If you are not using Eclipse, then you can use Maven from the command line 
to create a Java jar file with all dependent artifacts and then run the 
two Java applications (RegisterProxyToolApp and BlackboardCoursesForUserApp) that are built
using this project.

Note you must have Maven installed on your computer.  See http://maven.apache.org.

After you have unzipped the zipped project archive open a terminal (command window)
and navigate to the project's root folder (blackboardcoursesforuser).

Edit the src/main/resources/bbws.properties and provide values
for the property keys that are appropriate for your Blackboard installation.

Enter these commands in the terminal:

mvn clean

mvn package

cd target

In the target folder will be two Java jar files - one named blackboardcoursesforuser-0.0.1-SNAPSHOT-jar-with-dependencies.jar.
This Jar file was created by the Maven assembly plugin and includes all the project's dependent artifacts and the projects
compiled Java class files.

To run the RegisterProxyToolApp enter this command:

java -cp blackboardcoursesforuser-0.0.1-SNAPSHOT-jar-with-dependencies.jar edu.ku.it.si.registerproxytool.app.RegisterProxyToolApp

The results of running the program will display in the terminal.

After running the RegisterProxyToolApp you will need to login to your Blackboard installation
as an administrator and authorize the proxy tool (see the documentation in the documentation folder).

Once the proxy tool has been authorized you can run the BlackboardCoursesForUserApp program.

To run the BlackboardCoursesForUserApp enter this command:

java -cp blackboardcoursesforuser-0.0.1-SNAPSHOT-jar-with-dependencies.jar edu.ku.it.si.blackboardcoursesforuser.app.BlackboardCoursesForUserApp

The results of running the program will display in the terminal.

If you need assistance please email Bruce@Phillips.name.