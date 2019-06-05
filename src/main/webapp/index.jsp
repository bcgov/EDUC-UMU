<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="fill-height-lg">
<head>
  <%@ include file="assets/template/meta.jsp" %>
</head>
<%@ include file="assets/template/header.jsp" %>
<main role="main">
  <div class="container">
    <div class="row">
      <h1>OBIEE User Management Home</h1>
      <p>Welcome to the OBIEE UserID Management application. From here you can view and edit entries in the Ministry of Eductation's Oracle database. You are also able to view and edit the "act as" privileges of users for development and testing purposes</p>
      <div>
        <ul class="nav nav-pills">
          <li class="nav-item"><a class="nav-link" href=".">Login</a></li>
          <li class="nav-item"><a class="nav-link disabled" href="view_users.jsp">User Table</a></li>
          <li class="nav-item"><a class="nav-link disabled" href="act_as.jsp">Act as Table</a></li>
        </ul>
      </div>
    </div>
  </div>
</main>
<%@ include file="assets/template/footer.jsp" %>
</html>