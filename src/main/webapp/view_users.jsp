<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="fill-height-lg">
<head>
  <%@ include file="assets/template/meta.jsp" %>
</head>
<%@ include file="assets/template/header.jsp" %>

<script>
    $(document).ready(function() {
        $('#obiee_user').DataTable();
    } );
</script>

<main role="main">
    <div class="container">
        <div id="banner">
            <div class="row">
                <h1>OBIEE Users</h1>
            </div>
        </div>
        <div class="row">
            <table id="obiee_user" class="table table-striped table-hover" style="width:100%">
                <thead class="thead-dark">
                    <tr>
                        <th>Display Name</th>
                        <th>ODBC Password</th>
                        <th>Portal Path</th>
                        <th>Authentication</th>
                        <th>Privileges</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nathan Denny</td>
                        <td>123456789</td>
                        <td>IDIR</td>
                        <td>NDENNY</td>
                        <td>EDW Developer</td>
                        <td><a href="view_users.jsp"><i class="fas fa-edit"></i></a></td>
                        <td><a class="delete" href="view_users.jsp"><i class="fas fa-trash"></i></a></td>
                    </tr>
                    <tr>
                        <td>Frank Reynolds</td>
                        <td>password1234</td>
                        <td>BCeID</td>
                        <td>5689546</td>
                        <td>Full</td>
                        <td><a href="view_users.jsp"><i class="fas fa-edit"></i></a></td>
                        <td><a class="delete" href="view_users.jsp"><i class="fas fa-trash"></i></a></td>
                    </tr>
                    <tr>
                        <td>Fake Name</td>
                        <td>notreal</td>
                        <td>GUID</td>
                        <td>123kjkgk452lhk564hkl</td>
                        <td>EDW General, EDW EAB Analyst</td>
                        <td><a href="view_users.jsp"><i class="fas fa-edit"></i></a></td>
                        <td><a class="delete" href="view_users.jsp"><i class="fas fa-trash"></i></a></td>
                    </tr>
                </tbody>
            </table>    
        </div>
    </div>
</main>

<%@ include file="assets/template/footer.jsp" %>
</html>