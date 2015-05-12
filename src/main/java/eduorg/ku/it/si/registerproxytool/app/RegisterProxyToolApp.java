/**
 * 
 */
package edu.ku.it.si.registerproxytool.app;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.ku.it.si.registerproxytool.controller.RegisterToolController;

/**
 * Run the RegisterProxyTool application 
 * (see the ReadMe.txt file for how to
 * configure this application) to register
 * a proxy tool with your installation
 * of Blackboard.
 * @author bphillips
 *
 */
public class RegisterProxyToolApp {

	ApplicationContext ctx = new ClassPathXmlApplicationContext(
   "applicationContext_BBWS.xml");
	
	RegisterToolController registerToolController;
	/**
	 * @param args
	 */
	public static void main(String[] args) {

				
		RegisterProxyToolApp app = new RegisterProxyToolApp();
		
		app.run();
	
	}

	private void run() {
		
		
		registerToolController = (RegisterToolController) ctx.getBean("registerToolController");
		
		registerToolController.registerProxyToolWithBlackboard();
		
		
		
	}

}
