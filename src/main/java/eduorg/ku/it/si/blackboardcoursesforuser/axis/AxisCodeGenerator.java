package edu.ku.it.si.blackboardcoursesforuser.axis;

import org.apache.axis2.wsdl.WSDL2Code;

/**
 * Create the web service client classes
 * using the Axis2 framework and a WSDL 
 * file for the Blackboard web service.
 * @author bphillips
 *
 */
public class AxisCodeGenerator {
	public static void main(String[] args) throws Exception {
		
		/*
		 * The arguments and their values below represent:
		 * S - where to place the generated code
		 * R - where to place any resources generated
		 * p - the package to use for the generated code
		 * d - create client classes
		 * uri - location of the WSDL file to use
		 */
		WSDL2Code.main(new String[] { 
				"-S", "src/main/java",
				"-R", "src/main/resources/META-INF",
				"-p", "edu.ku.it.si.bbcoursews.generated",
				"-d", "adb",
				"-uri", "src/main/resources/courseWS.wsdl" });
		
		System.out.println("Done!");
	}
}
