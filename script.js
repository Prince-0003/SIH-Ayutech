// Tab switching functionality
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Image upload preview
        const uploadTrigger = document.getElementById('upload-trigger');
        const herbImage = document.getElementById('herb-image');
        const previewImage = document.getElementById('preview-image');
        
        uploadTrigger.addEventListener('click', () => {
            herbImage.click();
        });
        
        herbImage.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    uploadTrigger.querySelector('p').textContent = 'Image uploaded successfully!';
                }
                reader.readAsDataURL(file);
            }
        });

        // Generate QR code
        document.getElementById('generate-qr').addEventListener('click', function() {
            const herbName = document.getElementById('herb-name').value;
            if (!herbName) {
                showNotification('Please select an herb first', 'error');
                return;
            }
            
            if (!previewImage.src) {
                showNotification('Please upload an image first', 'error');
                return;
            }
            
            // Update herb details
            document.getElementById('detail-name').textContent = document.getElementById('herb-name').options[document.getElementById('herb-name').selectedIndex].text;
            
            // Generate QR code
            QRCode.toCanvas(document.getElementById('qr-canvas'), 'HERB-5OCT23-1082', function(error) {
                if (error) console.error(error);
            });
            
            // Show QR section
            document.getElementById('qr-section').style.display = 'block';
            
            // Simulate blockchain transaction
            setTimeout(() => {
                showNotification('Blockchain transaction completed! Herb data has been recorded.', 'success');
            }, 1000);
        });

        // Fetch herb details in processing tab
        document.getElementById('fetch-herb').addEventListener('click', function() {
            document.querySelector('.herb-info').style.display = 'block';
            showNotification('Herb details loaded successfully', 'success');
        });

        // Update status in processing tab
        document.getElementById('update-status').addEventListener('click', function() {
            const nextAction = document.getElementById('next-action').value;
            if (!nextAction) {
                showNotification('Please select an action', 'error');
                return;
            }
            
            showNotification('Status updated on blockchain! Transaction hash: 0xe2a4...d91c', 'success');
            
            // Simulate status update
            const statusSteps = document.querySelectorAll('.status-step');
            if (statusSteps[1].classList.contains('active')) {
                statusSteps[1].classList.remove('active');
                statusSteps[1].classList.add('completed');
                statusSteps[2].classList.add('active');
            }
        });

        // Track batch in logistics tab
        document.getElementById('track-batch').addEventListener('click', function() {
            document.getElementById('logistics-info').style.display = 'block';
            showNotification('Logistics information loaded', 'success');
        });

        // View journey in consumer tab
        document.getElementById('view-journey').addEventListener('click', function() {
            document.querySelector('.journey-card').style.display = 'block';
            showNotification('Product journey displayed', 'success');
        });

        // Manual scan button
        document.getElementById('manual-scan-btn').addEventListener('click', function() {
            document.getElementById('scan-results').style.display = 'block';
            showNotification('Product details loaded', 'success');
        });

        // View full journey from scan results
        document.getElementById('view-full-journey').addEventListener('click', function() {
            // Switch to consumer tab and trigger view
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            document.querySelector('[data-tab="consumer"]').classList.add('active');
            document.getElementById('consumer').classList.add('active');
            
            document.querySelector('.journey-card').style.display = 'block';
        });

        // Simulate GPS and timestamp
        function updateLocationAndTime() {
            const now = new Date();
            document.getElementById('timestamp').textContent = now.toLocaleString();
        }
        
        // Initial call and set interval to update time
        updateLocationAndTime();
        setInterval(updateLocationAndTime, 60000);

        // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.querySelector('.notification-message').textContent = message;
            
            // Update icon and color based on type
            const icon = notification.querySelector('i');
            if (type === 'success') {
                notification.className = 'notification success';
                icon.className = 'fas fa-check-circle';
            } else {
                notification.className = 'notification error';
                icon.className = 'fas fa-exclamation-circle';
            }
            
            // Show notification
            notification.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Add click events to action cards
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', function() {
                const action = this.querySelector('h3').textContent;
                showNotification(`${action} action initiated`, 'success');
            });
        });