package com.ilrn.session.services;

import blackboard.base.BbList;
import blackboard.base.BbList.Iterator;
import blackboard.base.FormattedText;
import blackboard.base.FormattedText.Type;
import blackboard.cms.filesystem.CSAccessControlEntry;
import blackboard.cms.filesystem.CSContext;
import blackboard.cms.filesystem.CSDirectory;
import blackboard.cms.filesystem.CSEntry;
import blackboard.cms.filesystem.CSFile;
import blackboard.cms.filesystem.security.CoursePrincipal;
import blackboard.data.ValidationException;
import blackboard.data.content.Content;
import blackboard.data.content.Content.RenderType;
import blackboard.data.content.CourseDocument;
import blackboard.data.course.Course;
import blackboard.data.course.CourseMembership;
import blackboard.data.course.CourseMembership.Role;
import blackboard.data.gradebook.Lineitem;
import blackboard.data.navigation.CourseToc;
import blackboard.data.navigation.CourseToc.Target;
import blackboard.persist.BbPersistenceManager;
import blackboard.persist.DataType;
import blackboard.persist.Id;
import blackboard.persist.KeyNotFoundException;
import blackboard.persist.PersistenceException;
import blackboard.persist.PkId;
import blackboard.persist.content.ContentDbLoader;
import blackboard.persist.content.ContentDbPersister;
import blackboard.persist.course.CourseMembershipDbLoader;
import blackboard.persist.gradebook.LineitemDbLoader;
import blackboard.persist.gradebook.LineitemDbPersister;
import blackboard.persist.navigation.CourseTocDbLoader;
import blackboard.platform.BbServiceManager;
import blackboard.platform.filesystem.FileSystemException;
import blackboard.platform.filesystem.FileSystemService;
import blackboard.platform.persistence.PersistenceService;
import blackboard.platform.plugin.PlugInUtil;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;

public class BlackBoardHelper
{
  protected static final String COMMAND = "command";
  protected static final String SERVER_NAME = "serverName";
  protected static final String INSTITUTION_ID = "institutionID";
  protected static final String USER_ID = "userID";
  protected static final String RETURN_COURSE_ID = "returnCourseID";
  protected static final String CHAPTER = "chapter";
  protected static final String BOOK = "book";
  protected static final String REDIRECT = "redirect";
  protected static final String BOOK_PERMISSIONS = "permissions.book.read";
  protected static final String ASSIGNMENT_NAME = "assignmentName";
  protected static final String COURSES_PATH = "courses";
  protected static final String DEFAULT_COMMAND = "authenticate-user";
  public static final String JSP_PARM_COURSE_ID = "course_id";
  public static final String JSP_PARM_ASSIGNMENT_NAME = "assignmentName";
  public static final String JSP_PARM_BOOK_TITLE = "bookTitle";
  public static final String JSP_PARM_BOOK_CHAPTER = "bookChapter";
  public static final String JSP_PARM_BOOK_PERMISSIONS = "permissions.book.read";
  public static final String JSP_PARM_CONTENT_ID = "content_id";
  public static final String CONTENT_HANDLER_ASSIGNMENT = "resource/x-iLrn2bb_1-link";
  public static final String CONTENT_HANDLER_COURSEWARE = "resource/x-iLrn2bb_2-link";
  public static final String CONTENT_HANDLER_OTHER = "resource/x-iLrn2bb_3-link";
  public static final String CONTENT_HANDLER_EXTERNAL_LINK = "resource/x-bb-externallink";
  public static final String WEB_INF_DIR = "/WEB-INF/";
  public static final int BB_POST = 0;
  public static final int LAUNCH_COURSEWARE = 1;
  public static final int LAUNCH_GRADEBOOK = 2;
  public static final int LAUNCH_INSTRUCTOR_TOOLS = 3;
  public static final int LAUNCH_STUDENT_TOOLS = 4;
  public static final int LAUNCH_TAKE_ASSIGNMENT = 5;
  public static final int RETURN_ROSTER = 6;
  private static final String CONTENT = "content";
  private static final String FILE_SEPARATOR = System.getProperty("file.separator");

  public static final String getWebInfPath(String path)
  {
    return path + "/WEB-INF/";
  }

  public static String getAppUrl(String authPath, Course course, String path, Map urlArgs)
    throws Exception
  {
    putServerName(path, urlArgs);
    StringBuffer sb = new StringBuffer();

    sb.append(getIlrnHostName(course, path));
    sb.append(authPath);

    Map finalMap = get_authentication(urlArgs, path);
    appendUrlArgs(finalMap, sb);

    return sb.toString();
  }

  public static String getAppUrl(Course course, String path, Map urlArgs)
    throws Exception
  {
    IlrnConfig ilrnConfig = IlrnConfig.getInstance(path);
    String authPath = ilrnConfig.getIlrnServerHostUrlMapping();
    return getAppUrl(authPath, course, path, urlArgs);
  }

  protected static Map get_authentication(Map urlArgs, String path)
  {
    Map _urlArgs = urlArgs;

    String shared_secret = null;
    try
    {
      SharedSecretManager manager = SharedSecretManager.getInstance();
      shared_secret = manager.getSharedSecret(path);

      _urlArgs.put("crypt", getCryptString(urlArgs, shared_secret));
    } catch (Exception g) {
      System.err.println("get_authentication error: exception thrown");
      System.err.println("get_authentication g.toString: " + g.toString());
      System.err.println("get_authentication g.getMessage: " + g.getMessage());
    }
    return _urlArgs;
  }

  public static String getCryptString(Map args, String sharedSecret)
  {
    String totalString = "";
    int total = 0;
    byte[] result = null;
    String finalResult = "";

    Set entries = args.entrySet();
    for (Iterator iter = entries.iterator(); iter.hasNext(); ) {
      Map.Entry entry = (Map.Entry)iter.next();

      if ("AUTH".equalsIgnoreCase((String)entry.getKey()))
      {
        continue;
      }
      String urlData = (String)entry.getValue();

      byte[] buffer = urlData.getBytes();
      for (int i = 0; i < buffer.length; i++) {
        total += buffer[i];
      }

    }

    totalString = totalString + Integer.toString(total);

    totalString = totalString + sharedSecret;
    try
    {
      MessageDigest md = MessageDigest.getInstance("MD5");

      md.update(totalString.getBytes());
      result = md.digest();
    } catch (Exception x) {
      System.err.println("Exception occured during MD5 creation.");
    }

    for (int i = 0; i < 16; i++) {
      String convert = Integer.toHexString(result[i] & 0xFF);
      if (convert.length() < 2)
        convert = "0" + convert;
      finalResult = finalResult + convert;
    }
    return finalResult.toUpperCase();
  }

  public static Map getRequestParameterMap(HttpServletRequest request)
  {
    Map result = new HashMap();
    Enumeration en = request.getParameterNames();
    while (en.hasMoreElements())
    {
      String key = (String)en.nextElement();
      result.put(key, request.getParameter(key));
    }
    return result;
  }

  public static String get_authentication(HttpServletRequest request, String shared_secret)
  {
    return getCryptString(getRequestParameterMap(request), shared_secret);
  }

  protected static void putServerName(String path, Map urlArgs)
    throws IOException
  {
    IlrnConfig ilrnConfig = IlrnConfig.getInstance(path);
    String serverName = ilrnConfig.getServerName();
    String key = "serverName";
    urlArgs.put(key, serverName);
  }

  protected static void appendUrlArgs(Map urlArgs, StringBuffer sb)
    throws Exception
  {
    boolean first = true;
    Set entries = urlArgs.entrySet();
    for (Iterator iter = entries.iterator(); iter.hasNext(); ) {
      Map.Entry entry = (Map.Entry)iter.next();
      first = appendUrlArg((String)entry.getKey(), (String)entry.getValue(), first, sb);
    }
  }

  protected static boolean appendUrlArg(String key, String arg, boolean first, StringBuffer sb)
    throws Exception
  {
    boolean b = first;
    if ((arg != null) && (!"".equals(arg))) {
      if (first) {
        sb.append("?");
        b = false;
      } else {
        sb.append("&");
      }
      sb.append(key);
      sb.append("=");
      if ("crypt".equals(key))
        sb.append(arg);
      else {
        sb.append(URLEncoder.encode(arg, "UTF-8"));
      }
    }
    return b;
  }

  protected static String getIlrnHostName(Course course, String path)
    throws Exception
  {
    IlrnConfig ilrnConfig = IlrnConfig.getInstance(path);
    String propFilename = ilrnConfig.getCoursePropertiesFilename();

    String ilrnServerHostname = getCourseServerURL(course, propFilename);

    if (("".equals(ilrnServerHostname)) || (ilrnServerHostname == null)) {
      ilrnServerHostname = ilrnConfig.getIlrnServerHostName();
    }

    return ilrnServerHostname;
  }

  protected static String getCourseServerURL(Course course, String coursePropertiesFilename)
    throws Exception
  {
    String iLrnServerURL = "";
    Properties p = getContentProperties(coursePropertiesFilename, course);
    if (p == null) {
      throw new Exception("Unable to load the course properties files.");
    }
    iLrnServerURL = p.getProperty("iLrnServerURL");
    return iLrnServerURL;
  }

  public static File findFile(File rootDirectory, String fileName)
  {
    if ((rootDirectory == null) || (fileName == null) || (!rootDirectory.isDirectory()))
    {
      return null;
    }

    File[] files = rootDirectory.listFiles();

    for (int f = 0; (files != null) && (f < files.length); f++)
    {
      if (files[f] == null)
        continue;
      if (files[f].isDirectory())
      {
        File file = findFile(files[f], fileName);

        if (file != null)
        {
          return file;
        }

      }
      else if ((files[f].getName() != null) && (files[f].getName().equals(fileName)))
      {
        return files[f];
      }
    }

    return null;
  }

  public static CSEntry findFileEntry(CSDirectory csDirectory, String fileName)
  {
    if ((csDirectory == null) || (fileName == null)) {
      return null;
    }

    List files = csDirectory.getDirectoryContents();
    for (int f = 0; (files != null) && (f < files.size()); f++) {
      CSEntry cse = (CSEntry)files.get(f);
      if (cse == null) {
        continue;
      }
      if ((cse instanceof CSDirectory)) {
        CSDirectory newCsd = (CSDirectory)cse;
        CSEntry cseNew = findFileEntry(newCsd, fileName);
        if (cseNew != null) {
          return cseNew;
        }
      }
      else if ((cse != null) && (cse.getBaseName().equals(fileName))) {
        return cse;
      }
    }

    return null;
  }

  public static Hashtable processRequest(HttpServletRequest request, String userId, Properties properties, int actionSwitch)
  {
    Hashtable urlArgs = new Hashtable();
    String chapter = null;
    try
    {
      switch (actionSwitch) {
      case 1:
        chapter = request.getParameter("bookChapter");
        if (chapter == null) {
          chapter = "";
        }
        urlArgs.put("redirect", "courseware");
        urlArgs.put("book", request.getParameter("bookTitle"));
        urlArgs.put("chapter", chapter);
        break;
      case 2:
        urlArgs.put("redirect", "instructor-gradebook");
        break;
      case 3:
        urlArgs.put("redirect", "assignment-manager");
        break;
      case 4:
        urlArgs.put("redirect", "student-assignments");
        break;
      case 5:
        urlArgs.put("redirect", "take-assignment");
        urlArgs.put("assignmentName", request.getParameter("assignmentName"));
        urlArgs.put("permissions.book.read", request.getParameter("permissions.book.read"));
      }

      urlArgs.put("serverName", request.getServerName() + ":" + request.getServerPort());
      urlArgs.put("command", "authenticate-user");
      urlArgs.put("institutionID", properties.getProperty("defaultInstitutionID"));
      urlArgs.put("userID", userId);
      urlArgs.put("returnCourseID", request.getParameter("course_id"));
    } catch (Exception f) {
      System.err.println("processRequest error: exception thrown");
      System.err.println("processRequest f.toString: " + f.toString());
      System.err.println("processRequest f.getMessage: " + f.getMessage());
    }
    return urlArgs;
  }

  public static Hashtable processRequest(HttpServletRequest request, String userId, Properties properties, String assignmentName)
  {
    Hashtable urlArgs = new Hashtable();
    try
    {
      if ((("".equals(request.getParameter("quizName"))) || (request.getParameter("quizName") == null)) && (!"".equals(request.getParameter("test")))) {
        urlArgs.put("test", request.getParameter("test"));
        urlArgs.put("return_assignmentName", request.getParameter("return_assignmentName"));
      }
      else if ((("".equals(request.getParameter("test"))) || (request.getParameter("test") == null)) && (!"".equals(request.getParameter("quizName")))) {
        urlArgs.put("name", request.getParameter("quizName"));
        urlArgs.put("return_assignmentName", request.getParameter("quizName"));
      }
      else {
        throw new Exception("Fatal error: Missing URL arguments.");
      }
      urlArgs.put("user", "bb");
      urlArgs.put("auth", "true");
      urlArgs.put("inst", "BbBldgBlks");
      urlArgs.put("server", request.getServerName() + ":" + request.getServerPort());
      urlArgs.put("path", PlugInUtil.getUri("wads", "bca2bb", "bca-com/bb-post.jsp"));
      urlArgs.put("return_course_id", request.getParameter("course_id"));
      urlArgs.put("return_line_id", request.getParameter("line_id"));
      urlArgs.put("return_user_id", userId);
    }
    catch (Exception f) {
      System.err.println("processRequest error: launch-quiz.jsp exception thrown");
      System.err.println("processRequest f.toString: " + f.toString());
      System.err.println("processRequest f.getMessage: " + f.getMessage());
    }
    return urlArgs;
  }

  public static Properties getProperties(String path)
  {
    try
    {
      IlrnConfig ilrnConfig = IlrnConfig.getInstance(path);
      return ilrnConfig.getProperties();
    }
    catch (IOException e)
    {
      System.err.println("Error encountered trying to load properties.");
    }return new Properties();
  }

  public static String getContentPermissions(String contentIDsFilename, File coursePath)
  {
    String output = "";
    try {
      File contentIDfile = findFile(coursePath, contentIDsFilename);

      if (contentIDfile != null) {
        FileInputStream fis = new FileInputStream(contentIDfile);
        Properties p = new Properties();
        p.load(fis);

        if (p == null) {
          throw new Exception("Unable to load the content ID properties files.");
        }

        String contentIDs = p.getProperty("contentIDs");
        String[] contentID = contentIDs.split("[|]");

        for (int i = 0; i < contentID.length; i++)
        {
          output = output + "|" + contentID[i];
        }
        fis.close();
      }
    } catch (Exception e) {
      System.err.println("Error loading content IDs.");
      System.err.println("e.toString: " + e.toString());
      System.err.println("e.getMessage: " + e.getMessage());
    }
    finally
    {
    }
    return output;
  }

  public static void prepCartridgeLinks(Id courseId)
    throws Exception
  {
    CourseTocDbLoader tocLoader = (CourseTocDbLoader)getPersistenceManager().getLoader("CourseTocDbLoader");
    ContentDbLoader contentLoader = (ContentDbLoader)getPersistenceManager().getLoader("ContentDbLoader");
    ContentDbPersister contentPersister = (ContentDbPersister)getPersistenceManager().getPersister("ContentDbPersister");

    BbList tocList = tocLoader.loadByCourseId(courseId);
    BbList.Iterator li = tocList.getFilteringIterator();

    while (li.hasNext()) {
      CourseToc current = (CourseToc)(CourseToc)li.next();
      if ((current.getTargetType() == CourseToc.Target.CONTENT) && ((current.getLabel().equalsIgnoreCase("Course Documents")) || (current.getLabel().equalsIgnoreCase("Assignments"))))
      {
        Content currentContent = contentLoader.loadByTocId(current.getId());

        if (currentContent.getIsFolder()) {
          BbList docChildren = contentLoader.loadListById(currentContent.getId());
          BbList.Iterator liDocChildren = docChildren.getFilteringIterator();

          while (liDocChildren.hasNext())
          {
            Content currentChild = (Content)(Content)liDocChildren.next();

            String urlToIlrn = currentChild.getUrl();

            if ((!"".equals(urlToIlrn)) && (urlToIlrn != null) && (urlToIlrn.indexOf("course_id") != -1))
            {
              int positionOfCourseIdStart = urlToIlrn.indexOf("course_id");

              int positionOfCourseIdEnd = urlToIlrn.indexOf("&", positionOfCourseIdStart);

              String newUrl = "";

              if (positionOfCourseIdEnd != -1)
              {
                newUrl = urlToIlrn.substring(0, positionOfCourseIdStart) + "course_id=" + courseId.toExternalString() + urlToIlrn.substring(positionOfCourseIdEnd);
              }
              else newUrl = urlToIlrn.substring(0, positionOfCourseIdStart) + "course_id=" + courseId.toExternalString();

              currentChild.setUrl(newUrl);
              contentPersister.persist(currentChild);
            }
          }
        }
      }
    }
  }

  public static String getSharedSecret(String path)
  {
    String result = null;
    try
    {
      SharedSecretManager manager = SharedSecretManager.getInstance();
      result = manager.getSharedSecret(path);
    }
    catch (IOException e)
    {
      System.err.println("Error retrieving the CengageNOW shared secret.");
    }
    return result;
  }

  public static String getContentIDselect(File coursePath, String contentIDsFilename)
  {
    return getContentIDselect(coursePath, "use", contentIDsFilename);
  }

  public static String getContentIDselect(File coursePath, String type, String contentIDsFilename)
  {
    String CLOSING_OPTION_TAG = "</option>";
    String CLOSING_SELECT_TAG = "</select>";
    String contentIDselectHTML = "";
    if (type.equals("use")) {
      contentIDselectHTML = "<select name=\"contentID\" id=\"contentID\"> <option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
    }
    else if (type.equals("remove")) {
      contentIDselectHTML = "<select name=\"removeContentID\" id=\"removeContentID\"> <option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
    }
    try
    {
      File contentIDfile = null;

      contentIDfile = findFile(coursePath, contentIDsFilename);

      if (contentIDfile != null) {
        FileInputStream fis = new FileInputStream(contentIDfile);
        Properties p = new Properties();
        p.load(fis);

        if (p == null) {
          throw new Exception("Unable to load the content ID properties files.");
        }

        String contentIDs = p.getProperty("contentIDs");
        if (contentIDs != null)
        {
          String[] contentID = contentIDs.split("[|]");

          for (int i = 0; i < contentID.length; i++) {
            String contentTitle = p.getProperty(contentID[i] + "-contentTitle");
            if (contentTitle != null)
              contentIDselectHTML = contentIDselectHTML + "<option value=\"" + contentID[i] + "\">" + contentTitle + CLOSING_OPTION_TAG;
            else
              contentIDselectHTML = contentIDselectHTML + "<option value=\"" + contentID[i] + "\">" + contentID[i] + CLOSING_OPTION_TAG;
          }
        }
        fis.close();
      }

      contentIDselectHTML = contentIDselectHTML + CLOSING_SELECT_TAG;
    }
    catch (Exception e) {
      System.err.println("Error loading content IDs.");
      System.err.println("e.toString: " + e.toString());
      System.err.println("e.getMessage: " + e.getMessage());
      contentIDselectHTML = "<select name=contentID id=\"contentID\"> <option value=\"\" selected>ERROR loading Content IDs" + CLOSING_OPTION_TAG + CLOSING_SELECT_TAG;
    }
    return contentIDselectHTML;
  }

  public static String getContentIDselectForEdit(File coursePath, String type, String contentIDsFilename, String contentId)
  {
    String CLOSING_OPTION_TAG = "</option>";
    String CLOSING_SELECT_TAG = "</select>";
    String contentIDselectHTML = "";
    if (type.equals("use")) {
      contentIDselectHTML = "<select name=\"contentID\" id=\"contentID\"> ";
    }
    else if (type.equals("remove")) {
      contentIDselectHTML = "<select name=\"removeContentID\" id=\"removeContentID\"> <option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
    }
    try
    {
      File contentIDfile = null;

      contentIDfile = findFile(coursePath, contentIDsFilename);
      boolean isSelected = false;
      if (contentIDfile != null) {
        FileInputStream fis = new FileInputStream(contentIDfile);
        Properties p = new Properties();
        p.load(fis);

        if (p == null) {
          throw new Exception("Unable to load the content ID properties files.");
        }

        String contentIDs = p.getProperty("contentIDs");
        if (contentIDs != null)
        {
          String[] contentID = contentIDs.split("[|]");
          StringBuffer options = new StringBuffer();
          for (int i = 0; i < contentID.length; i++) {
            String contentTitle = p.getProperty(contentID[i] + "-contentTitle");
            if (contentTitle != null) {
              String tmp = "<option value=\"" + contentID[i] + "\"" + compareContentIds(contentID[i], contentId, isSelected) + ">" + contentTitle + CLOSING_OPTION_TAG;
              options.append(tmp);
            }
            else {
              String tmp = "<option value=\"" + contentID[i] + "\">" + contentID[i] + CLOSING_OPTION_TAG;
              options.append(tmp);
            }
          }
          if (!isSelected)
            contentIDselectHTML = contentIDselectHTML + "<option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
          else {
            contentIDselectHTML = contentIDselectHTML + "<option value=\"\">Existing Content Titles" + CLOSING_OPTION_TAG;
          }
          contentIDselectHTML = contentIDselectHTML + options.toString();
        }

        fis.close();
      }

      contentIDselectHTML = contentIDselectHTML + CLOSING_SELECT_TAG;
    }
    catch (Exception e) {
      System.err.println("Error loading content IDs.");
      System.err.println("e.toString: " + e.toString());
      System.err.println("e.getMessage: " + e.getMessage());
      contentIDselectHTML = "<select name=contentID id=\"contentID\"> <option value=\"\" selected>ERROR loading Content IDs" + CLOSING_OPTION_TAG + CLOSING_SELECT_TAG;
    }
    return contentIDselectHTML;
  }

  public static Content loadContent(HttpServletRequest request)
  {
    Content result = null;
    try
    {
      BbPersistenceManager pm = getPersistenceManager();
      Id contentId = new PkId(pm.getContainer(), CourseDocument.DATA_TYPE, request.getParameter("content_id"));
      ContentDbLoader loader = (ContentDbLoader)pm.getLoader("ContentDbLoader");
      result = loader.loadById(contentId);
    }
    catch (PersistenceException e)
    {
      System.err.println("Couldn't load content having id: " + request.getParameter("content_id"));
    }
    return result;
  }

  public static Content loadContent(Id contentId)
  {
    Content result = null;
    try
    {
      ContentDbLoader courseDocumentLoader = (ContentDbLoader)getPersistenceManager().getLoader("ContentDbLoader");
      result = courseDocumentLoader.loadById(contentId);
    }
    catch (KeyNotFoundException e)
    {
    }
    catch (PersistenceException e)
    {
    }

    return result;
  }

  public static boolean assignmentAlreadyExists(Id myCourseId, String assignmentName)
  {
    boolean result = false;
    BbList itemsList = null;
    try {
      LineitemDbLoader liLoader = (LineitemDbLoader)getPersistenceManager().getLoader("LineitemDbLoader");
      itemsList = liLoader.loadByCourseIdAndLineitemName(myCourseId, assignmentName);
    } catch (Exception e) {
      System.err.println("Error checking for existance of assignment.");
    }

    if ((itemsList != null) && (!itemsList.isEmpty())) {
      return true;
    }
    return result;
  }

  public static Lineitem createLineitem(Id courseId, String name, String type)
  {
    return createLineitem(courseId, name, type, null);
  }

  public static Lineitem createLineitem(Id courseId, String name, String type, String ptsPossibleString)
  {
    Lineitem result = null;
    Lineitem li = new Lineitem();
    li.setCourseId(courseId);
    li.setName(name);
    li.setType(type);
    li.setIsAvailable(true);
    if (ptsPossibleString != null)
      li.setPointsPossible(Float.parseFloat(ptsPossibleString));
    try
    {
      LineitemDbPersister persister = (LineitemDbPersister)getPersistenceManager().getPersister("LineitemDbPersister");
      persister.persist(li);
      result = li;
    }
    catch (PersistenceException e)
    {
      System.err.println("Could not persist line item entry.");
    }
    catch (ValidationException e)
    {
      System.err.println("Validation of line item entry failed.");
    }
    return result;
  }

  public static String getUserType(Id courseId, Id userId)
  {
    String result = null;
    try
    {
      CourseMembershipDbLoader cmLoader = (CourseMembershipDbLoader)getPersistenceManager().getLoader("CourseMembershipDbLoader");
      CourseMembership cm = cmLoader.loadByCourseAndUserId(courseId, userId);

      if (cm.getRole().equals(CourseMembership.Role.INSTRUCTOR))
        result = "instructor";
      else
        result = "student";
    } catch (Exception t) {
      System.err.println("Unable to determine the users role.");

      result = "student";
    }
    return result;
  }

  public static void updateContent(Content content, Id parentId, Id courseId, String body, String contentHandler, String urlString)
  {
    content.setParentId(parentId);
    content.setCourseId(courseId);
    content.setBody(new FormattedText(body, FormattedText.Type.HTML));
    content.setContentHandler(contentHandler);
    content.setUrl(urlString);
    content.setRenderType(Content.RenderType.URL);
    content.setLaunchInNewWindow(true);
    try
    {
      ContentDbPersister persister = (ContentDbPersister)getPersistenceManager().getPersister("ContentDbPersister");
      persister.persist(content);
    }
    catch (PersistenceException e)
    {
      System.err.println("Could not persist course document entry.");
    }
    catch (ValidationException e)
    {
      System.err.println("Validation of course document entry failed.");
    }
  }

  public static Id generateId(DataType dataType, String id)
  {
    Id result = null;
    try
    {
      result = getPersistenceManager().generateId(dataType, id);
    }
    catch (PersistenceException e)
    {
      System.err.println("Could not persist " + DataType.toDbPersisterType(dataType) + " with key of " + id);
    }
    return result;
  }

  public static BbPersistenceManager getPersistenceManager()
  {
    return BbServiceManager.getPersistenceService().getDbPersistenceManager();
  }

  public static File getContentDirectoryPath(Course course)
    throws FileSystemException
  {
    if (course == null) {
      return null;
    }
    FileSystemService fileService = BbServiceManager.getFileSystemService();

    File contentDirectory = null;
    try
    {
      File courseDirectory = fileService.getCourseDirectory(course);

      contentDirectory = new File(courseDirectory + FILE_SEPARATOR + "content");
    }
    catch (FileSystemException e) {
      System.err.println("Error getting content path for course :" + course.getCourseId());
    }

    return contentDirectory;
  }

  public static File getContentDirectoryPath(String courseId)
  {
    FileSystemService fileService = BbServiceManager.getFileSystemService();

    File contentDirectory = null;
    try
    {
      File courseDirectory = fileService.getCourseDirectory(courseId);

      contentDirectory = new File(courseDirectory + FILE_SEPARATOR + "content");
    }
    catch (FileSystemException e) {
      System.err.println("Error getting content path for course :" + courseId);
    }

    return contentDirectory;
  }

  private static String compareContentIds(String firstContentId, String secondContentId, boolean isSelected) {
    String returnValue = "";
    if (firstContentId.equalsIgnoreCase(secondContentId)) {
      returnValue = "selected";
      isSelected = true;
    }
    return returnValue;
  }

  public static boolean contentAlreadyExists(Id contentId, String title)
  {
    boolean exists = false;
    BbList contentList = null;
    try {
      ContentDbLoader cLoader = (ContentDbLoader)getPersistenceManager().getLoader("ContentDbLoader");
      contentList = cLoader.loadListById(contentId);
      for (int counter = 0; counter < contentList.size(); counter++) {
        Content content = (Content)contentList.get(counter);
        if (content.getTitle().equalsIgnoreCase(title)) {
          exists = true;
          break;
        }
      }
    } catch (Exception e) {
    }
    return exists;
  }

  public static String getContentPermissions(String contentIDsFilename, Course course)
  {
    String output = "";
    try {
      Properties p = getContentProperties(contentIDsFilename, course);
      String contentIDs = p.getProperty("contentIDs");
      String[] contentID = contentIDs.split("[|]");

      for (int j = 0; j < contentID.length; j++)
      {
        output = output + "|" + contentID[j];
      }
    }
    catch (Exception e) {
      System.err.println("Error loading content IDs. file" + e);
    }
    return output;
  }

  public static String getContentIDselect(Course course, String contentIDsFilename)
  {
    return getContentIDselect(course, "use", contentIDsFilename);
  }

  public static String getContentIDselectForEdit(Course course, String type, String contentIDsFilename, String contentId) {
    String CLOSING_OPTION_TAG = "</option>";
    String CLOSING_SELECT_TAG = "</select>";
    String contentIDselectHTML = "";
    if (type.equals("use")) {
      contentIDselectHTML = "<select name=\"contentID\" id=\"contentID\"> ";
    }
    else if (type.equals("remove")) {
      contentIDselectHTML = "<select name=\"removeContentID\" id=\"removeContentID\"> <option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
    }
    try
    {
      Properties p = getContentProperties(contentIDsFilename, course);
      boolean isSelected = false;

      String contentIDs = p.getProperty("contentIDs");
      if (contentIDs != null)
      {
        String[] contentID = contentIDs.split("[|]");
        StringBuffer options = new StringBuffer();
        for (int i = 0; i < contentID.length; i++) {
          String contentTitle = p.getProperty(contentID[i] + "-contentTitle");
          if (contentTitle != null) {
            String tmp = "<option value=\"" + contentID[i] + "\"" + compareContentIds(contentID[i], contentId, isSelected) + ">" + contentTitle + CLOSING_OPTION_TAG;
            options.append(tmp);
          }
          else {
            String tmp = "<option value=\"" + contentID[i] + "\">" + contentID[i] + CLOSING_OPTION_TAG;
            options.append(tmp);
          }
        }
        if (!isSelected)
          contentIDselectHTML = contentIDselectHTML + "<option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
        else {
          contentIDselectHTML = contentIDselectHTML + "<option value=\"\">Existing Content Titles" + CLOSING_OPTION_TAG;
        }
        contentIDselectHTML = contentIDselectHTML + options.toString();
      }

      contentIDselectHTML = contentIDselectHTML + CLOSING_SELECT_TAG;
    }
    catch (Exception e) {
      System.err.println("Error loading content IDs.");
      System.err.println("e.toString: " + e.toString());
      System.err.println("e.getMessage: " + e.getMessage());
      contentIDselectHTML = "<select name=contentID id=\"contentID\"> <option value=\"\" selected>ERROR loading Content IDs" + CLOSING_OPTION_TAG + CLOSING_SELECT_TAG;
    }
    return contentIDselectHTML;
  }

  public static String getContentIDselect(Course course, String type, String contentIDsFilename)
  {
    String CLOSING_OPTION_TAG = "</option>";
    String CLOSING_SELECT_TAG = "</select>";
    String contentIDselectHTML = "";
    if (type.equals("use")) {
      contentIDselectHTML = "<select name=\"contentID\" id=\"contentID\"> <option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
    }
    else if (type.equals("remove")) {
      contentIDselectHTML = "<select name=\"removeContentID\" id=\"removeContentID\"> <option value=\"\" selected>Existing Content Titles" + CLOSING_OPTION_TAG;
    }

    try
    {
      Properties p = getContentProperties(contentIDsFilename, course);

      String contentIDs = p.getProperty("contentIDs");
      if (contentIDs != null) {
        String[] contentID = contentIDs.split("[|]");

        for (int i = 0; i < contentID.length; i++) {
          String contentTitle = p.getProperty(contentID[i] + "-contentTitle");

          if (contentTitle != null) {
            contentIDselectHTML = contentIDselectHTML + "<option value=\"" + contentID[i] + "\">" + contentTitle + CLOSING_OPTION_TAG;
          }
          else
          {
            contentIDselectHTML = contentIDselectHTML + "<option value=\"" + contentID[i] + "\">" + contentID[i] + CLOSING_OPTION_TAG;
          }
        }

      }

      contentIDselectHTML = contentIDselectHTML + CLOSING_SELECT_TAG;
    }
    catch (Exception e) {
      System.err.println("Error loading content IDs.");
      System.err.println("e.toString: " + e.toString());
      System.err.println("e.getMessage: " + e.getMessage());
      contentIDselectHTML = "<select name=contentID id=\"contentID\"> <option value=\"\" selected>ERROR loading Content IDs" + CLOSING_OPTION_TAG + CLOSING_SELECT_TAG;
    }

    return contentIDselectHTML;
  }

  public static Properties getContentProperties(String fileName, Course course)
  {
    Properties p = new Properties();
    try {
      InputStream is = null;
      CSContext ctxCS = CSContext.getContext();
      CSFile csFile = (CSFile)ctxCS.findEntry("/courses/" + course.getCourseId() + "/" + fileName);

      boolean moveRequired = false;
      if (csFile == null) {
        CSDirectory csd = ctxCS.getCourseDirectory(course);
        csFile = (CSFile)findFileEntry(csd, fileName);
        if (csFile != null)
          moveRequired = true;
      }
      else {
        try {
          String strCourseRolePrincipal = CoursePrincipal.calculatePrincipalID(course);
          CSAccessControlEntry csACE = csFile.getAccessControlEntry(strCourseRolePrincipal);
          csACE.updatePermissions(true, false, false, false);
          try {
            if (ctxCS != null)
              ctxCS.commit();
          }
          catch (Exception e) {
            System.err.println("Exception" + e.toString());
            ctxCS.rollback();
          }
        }
        catch (Exception e) {
          System.err.println("Exception" + e.toString());
        }
      }

      ByteArrayOutputStream outFile = new ByteArrayOutputStream();
      if (csFile != null) {
        csFile.getFileContent(outFile);
      }
      is = new ByteArrayInputStream(outFile.toByteArray());
      p.load(is);
      if (moveRequired) {
        is.reset();
        moveContentIdsFile(fileName, course, is, csFile);
      }
      is.close();
      outFile.close();
    } catch (Exception e) {
      System.err.println("Error In Loading ContentID File" + e);
    }
    return p;
  }

  public static void moveContentIdsFile(String fileName, Course course, InputStream bAis, CSFile csFile)
  {
    CSContext ctxCS = null;
    CSEntry file = null;
    try {
      ctxCS = CSContext.getContext();
      file = ctxCS.createFile("/courses/" + course.getCourseId(), fileName, bAis);

      String strCourseRolePrincipal = CoursePrincipal.calculatePrincipalID(course);
      CSAccessControlEntry csACE = file.getAccessControlEntry(strCourseRolePrincipal);
      csACE.updatePermissions(true, false, false, false);
    }
    catch (Exception e) {
      System.err.println("Error In Moving File= " + e.toString());
    }
    if (file != null)
      try {
        csFile.delete();
      } catch (Exception e) {
        System.err.println(" Error In Deleting File= " + e.toString());
      } finally {
        try {
          if (ctxCS != null)
            ctxCS.commit();
        }
        catch (Exception e) {
          System.err.println("Exception" + e.toString());
          ctxCS.rollback();
        }
      }
  }
}