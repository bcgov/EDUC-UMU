<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="fill-height-lg">
<head>
  <%@ include file="assets/template/meta.jsp" %>
</head>
<%@ include file="assets/template/header.jsp" %>
<main role="main">
    <div class="container">
        <div id="banner">
            <div class="row">
                <h1>Act As Privileges</h1>
            </div>
        </div>
        <div class="row">
            <table class="table table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>Display Name</th>
                        <th>Act as Privileges</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nathan Denny</td>
                        <td>General Test</td>
                        <td><i class="fas fa-edit"></i></td>
                    </tr>
                    <tr>
                        <td>Frank Reynolds</td>
                        <td>Developer Test</td>
                        <td><i class="fas fa-edit"></i></td>
                    </tr>
                    <tr>
                        <td>Fake Name</td>
                        <td>Master Test</td>
                        <td><i class="fas fa-edit"></i></td>
                    </tr>
                </tbody>
            </table>    
        </div>
    </div>
</main>
<%@ include file="assets/template/footer.jsp" %>
</html>