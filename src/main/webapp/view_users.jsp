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
            <table class="table table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>Display Name</th>
                        <th>ODBC Password</th>
                        <th>Portal Path</th>
                        <th>Authentication</th>
                        <th>Privileges</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nathan Denny</td>
                        <td>123456789</td>
                        <td>IDIR</td>
                        <td>NDENNY</td>
                        <td>EDW Developer</td>
                    </tr>
                    <tr>
                        <td>Frank Reynolds</td>
                        <td>password1234</td>
                        <td>BCeID</td>
                        <td>5689546</td>
                        <td>Full</td>
                    </tr>
                    <tr>
                        <td>Fake Name</td>
                        <td>notreal</td>
                        <td>GUID</td>
                        <td>123kjkgk452lhk564hkl</td>
                        <td>EDW General, EDW EAB Analyst</td>
                    </tr>
                </tbody>
            </table>    
        </div>
    </div>
</main>

<%@ include file="assets/template/footer.jsp" %>
</html>