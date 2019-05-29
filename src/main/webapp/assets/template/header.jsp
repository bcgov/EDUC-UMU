<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<body>
<header>
    <div class="banner">
        <a href="../../index.jsp" alt="British Columbia">
            <img src="../images/index.svg" height="43.4833" width="175px"/>
        </a>
        <h1>OBIEE User Management</h1>
        <div aria-label="This application is currently in Beta phase" class=Beta-PhaseBanner>Beta</div>
    </div>
    <div class="other">
            <a class="nav-btn">
              <i class="fas fa-bars" id="menu"></i>
            </a>
          <!-- 
            This place is for anything that needs to be right aligned
            beside the logo.
          -->
          </div>
</header>
<nav class="navigation-main" id="navbar">
        <div class="container">
          <ul>
            <li><a href="../../index.jsp">Home</a></li>
            <li><a href="../../index.jsp">Admin</a></li>
            <li><a href="../../index.jsp">View Users</a></li>
            <li><a href="../../index.jsp">Logout</a></li>
          </ul>
        </div>
      </nav>
    
      <script>
        function setupSampleMenuControl() {
          const useCapture = false;
          const show = elem => elem.style.display = 'block';
          const hide = elem => elem.style.display = 'none';
          const toggle = (elem) => {
            if (window.getComputedStyle(elem).display === 'block') {
              hide(elem);
              return;
            }
            show(elem);
          };
          // Listen for click events
          const menuButton = document.getElementById('menu');
          menuButton.addEventListener('click', (event) => {
            // Filter events
            if (event.target.id !== 'menu') return;
            // Prevent default link behavior
            event.preventDefault();
            // Check for a valid target
            const nav = document.getElementById('navbar')
            if (!nav) return;
            // Toggle
            toggle(nav);
          }, useCapture);
        }
        setupSampleMenuControl();
      </script>