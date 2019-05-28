<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <div class="banner">
        <a href="https://gov.bc.ca" alt="British Columbia">
            <img src="assets/images/index.svg" height="43.4833" width="175px"/>
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
            <li><a href=".">Home</a></li>
            <li><a href=".">Admin</a></li>
            <li><a href=".">View Users</a></li>
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
<divclass="middle">
    <h1>Hello World</h1>
</div>
<footer class="footer">
    <div class="footer_box">
         <ul>
            <li><a href=".">Home</a></li>
            <li><a href=".">Disclaimer</a></li>
            <li><a href=".">Privacy</a></li>
            <li><a href=".">Accessibility</a></li>
            <li><a href=".">Copyright</a></li>
            <li><a href=".">Contact Us</a></li>
        </ul>
    </div>
</footer>
</body>
</html>