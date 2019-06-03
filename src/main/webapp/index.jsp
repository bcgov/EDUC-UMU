<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <%@ include file="assets/template/meta.jsp" %>
</head>
<%@ include file="assets/template/header.jsp" %>
<div class="middle">
  <div class="container">
      <div class="wide_block">
      <!-- 
        Added comments to test openshift build config
        -->
          <h3>Login</h3>
          <form>
            <div class="text_label">
              <label>IDIR</label>
            </div>
            <input class="text_input" type="text" name="idir"><br>
            <div class="text_label">
              <label>Password</label>
            </div> 
            <input class="text_input" type="text" name="password"><br>
          </form>
      </div>
    </div>
</div>
<%@ include file="assets/template/footer.jsp" %>
</html>