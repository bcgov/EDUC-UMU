<%-- 
Header template that displays the BC Gov boilerplate header bar and nav menu
--%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<body>
<header>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="https://www2.gov.bc.ca">
        <img class="img-fluid d-none d-md-block" src="/assets/images/bcid-logo-rev-en.svg" width="181" height="44" alt="B.C. Government Logo">
        <img class="img-fluid d-md-none" src="/assets/images/bcid-symbol-rev.svg" width="64" height="44" alt="B.C. Government Logo">
      </a>
      <div class="navbar-brand">
        OBIEE UserID Management
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" href="index.jsp">Home</a>
          <a class="nav-item nav-link-disabled" href="view_users.jsp">View Users</a>
          <a class="nav-item nav-link-disabled" href="act_as.jsp">Edit Privileges</a>
        </div>
      </div>
    </div>
  </nav>
</header>