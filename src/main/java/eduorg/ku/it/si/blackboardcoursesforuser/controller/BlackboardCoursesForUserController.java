package edu.ku.it.si.blackboardcoursesforuser.controller;

import java.rmi.RemoteException;
import java.util.List;

import org.apache.log4j.Logger;

import edu.ku.it.si.blackboardcoursesforuser.service.BlackboardCoursesForUserService;

/**
 * Acts as a controller to provide behaviors
 * that enable interaction between a view
 * and services that provide Blackboard course
 * information for users.
 * @author bphillips
 *
 */
public class BlackboardCoursesForUserController {

	private static final Logger logger = Logger.getLogger(BlackboardCoursesForUserController.class.getName() );
	
	/*
	 * Values for these instance fields are injected using Spring.
	 * See the Spring configuration file applicationContext_BlackboardCoursesForUser.xml.
	 */
	private BlackboardCoursesForUserService blackboardCoursesForUserService ;
	
    private String blackboardServerURL ;
	
	private String clientVendorId ;
	
	private String clientProgramId;
	
	private String modulePath ;
	
	private String sharedSecret ;
	
	private String username ;
	



	/**
	 * Using the values of the instance fields (see
	 * public set methods) and the BlackboardCoursesForUserService 
	 * object get and display the course titles
	 * for the Blackboard user identified by 
	 * the instance field username.
	 */
	public void getBlackboardCoursesForUser() {
		
		try {
			
			List<String> courseTitles = blackboardCoursesForUserService.getBlackboardCoursesForUser(modulePath, blackboardServerURL, sharedSecret, clientVendorId, clientProgramId, username) ;
	
		    logger.info("Course titles for classes user " + getUsername() + " is enrolled in are: " + courseTitles);
		
		} catch (RemoteException e) {
			
			logger.error("There was an error when trying to get the Blackboard courses for user " + username + ": " + e.getMessage() );
			
		}
		
		
		
	}
	
	
	public BlackboardCoursesForUserService getBlackboardCoursesForUserService() {
		return blackboardCoursesForUserService;
	}

	
	public void setBlackboardCoursesForUserService(BlackboardCoursesForUserService blackboardCoursesForUserService) {
		this.blackboardCoursesForUserService = blackboardCoursesForUserService;
	}

	public String getBlackboardServerURL() {
		return blackboardServerURL;
	}

    /**
     * Set value of the URL to the Blackboard installation
     * @param blackboardServerURL
     */
	public void setBlackboardServerURL(String blackboardServerURL) {
		this.blackboardServerURL = blackboardServerURL;
	}

	public String getClientVendorId() {
		return clientVendorId;
	}

	/**
	 * Set value of the organization's vendor id for the 
	 * proxy tool being used - see value set in Blackboard
	 * System Admin.
	 * @param clientVendorId
	 */
	public void setClientVendorId(String clientVendorId) {
		this.clientVendorId = clientVendorId;
	}

	public String getClientProgramId() {
		return clientProgramId;
	}

	/**
	 * Set value of the name for the 
	 * proxy tool being used - see Blackboard
	 * System Admin.
	 * @param clientProgramId
	 */
	public void setClientProgramId(String clientProgramId) {
		this.clientProgramId = clientProgramId;
	}

	public String getModulePath() {
		return modulePath;
	}

	/**
	 * Set complete path to location of modules folder that
	 * contains the rampart.mar file.
	 * @param modulePath
	 */
	public void setModulePath(String modulePath) {
		this.modulePath = modulePath;
	}

	public String getSharedSecret() {
		return sharedSecret;
	}

	/**
	 * Set value of the shared secret for the 
	 * proxy tool being used - see value set in Blackboard
	 * System Admin.
	 * @param sharedSecret
	 */
	public void setSharedSecret(String sharedSecret) {
		this.sharedSecret = sharedSecret;
	}

	
	public String getUsername() {
		return username;
	}

    /**
     * Set value of Blackboard username.
     * @param username
     */
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
