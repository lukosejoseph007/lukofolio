document.addEventListener('DOMContentLoaded', function() {
  const tooltips = document.querySelectorAll('.info-tooltip');
  
  tooltips.forEach(tooltip => {
      tooltip.addEventListener('click', function(e) {
          e.stopPropagation();
          
          // Remove active class from all other tooltips
          tooltips.forEach(t => {
              if (t !== tooltip) {
                  t.querySelector('.tooltip-content').classList.remove('active');
              }
          });
          
          // Toggle current tooltip
          const content = this.querySelector('.tooltip-content');
          content.classList.toggle('active');
          
          // Handle backdrop
          let backdrop = document.querySelector('.tooltip-backdrop');
          if (!backdrop) {
              backdrop = document.createElement('div');
              backdrop.className = 'tooltip-backdrop';
              document.body.appendChild(backdrop);
          }
          
          backdrop.classList.toggle('active');
          
          // Close on backdrop click
          backdrop.onclick = function() {
              content.classList.remove('active');
              backdrop.classList.remove('active');
          };
      });
  });
  
  // Close all tooltips when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.info-tooltip')) {
          document.querySelectorAll('.tooltip-content').forEach(content => {
              content.classList.remove('active');
          });
          const backdrop = document.querySelector('.tooltip-backdrop');
          if (backdrop) {
              backdrop.classList.remove('active');
          }
      }
  });
});