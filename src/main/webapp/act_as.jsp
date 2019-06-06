<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="fill-height-lg">
<head>
  <%@ include file="assets/template/meta.jsp" %>
</head>
<%@ include file="assets/template/header.jsp" %>
<main role="main">

    <script>
    $(document).ready(function() {
        $('#act_as').DataTable();
    } );
    </script>

    <div class="container">
        <div id="banner">
            <div class="row">
                <h1>Act As Privileges</h1>
            </div>
        </div>
        <div class="row">
            <table id="act_as" class="table table-striped table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th>Display Name</th>
                        <th>Act as Privileges</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nathan Denny</td>
                        <td>General Test</td>
                        <td><a href="act_as.jsp"><i class="fas fa-edit"></i></a></td>
                        <td><a class="delete" href="act_as.jsp"><i class="fas fa-trash"></i></a></td>
                    </tr>
                    <tr>
                        <td>Frank Reynolds</td>
                        <td>Developer Test</td>
                        <td><a href="act_as.jsp"><i class="fas fa-edit"></i></a></td>
                        <td><a class="delete" href="act_as.jsp"><i class="fas fa-trash"></i></a></td>
                    </tr>
                    <tr>
                        <td>Fake Name</td>
                        <td>Master Test</td>
                        <td><a href="act_as.jsp"><i class="fas fa-edit"></i></a></td>
                        <td><a class="delete" href="act_as.jsp"><i class="fas fa-trash"></i></a></td>
                    </tr>
                </tbody>
            </table>    
        </div>
    </div>
</main>
<%@ include file="assets/template/footer.jsp" %>
</html>