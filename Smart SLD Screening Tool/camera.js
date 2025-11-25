// Camera functionality
if (typeof stream === 'undefined') {
    var stream = null;
}

// Initialize camera
function initCamera() {
    try {
        // Check if camera is already initialized
        if (document.getElementById('camera-modal')) {
            setupCameraHandlers();
        }
    } catch (error) {
        console.error('Error initializing camera:', error);
    }
}

// Setup camera modal and handlers
function setupCameraHandlers() {
    const cameraModal = document.getElementById('camera-modal');
    const cameraBtn = document.getElementById('camera-btn');
    const closeCameraBtn = document.getElementById('close-camera');
    const captureBtn = document.getElementById('capture-btn');
    const video = document.getElementById('camera-feed');
    const canvas = document.getElementById('camera-canvas');
    const photoInput = document.getElementById('photo');
    
    // Open camera modal
    if (cameraBtn) {
        cameraBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await openCamera();
        });
    }
    
    // Close camera modal
    if (closeCameraBtn) {
        closeCameraBtn.addEventListener('click', () => {
            closeCamera();
            cameraModal.classList.add('hidden');
        });
    }
    
    // Capture photo
    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            capturePhoto(video, canvas);
        });
    }
    
    // Close modal when clicking outside
    cameraModal.addEventListener('click', (e) => {
        if (e.target === cameraModal) {
            closeCamera();
            cameraModal.classList.add('hidden');
        }
    });
}

// Open camera
async function openCamera() {
    const cameraModal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-feed');
    
    try {
        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user'
            },
            audio: false
        });
        
        // Show camera feed
        video.srcObject = stream;
        cameraModal.classList.remove('hidden');
        
        // Play video once it's loaded
        video.onloadedmetadata = () => {
            video.play();
        };
        
        // Handle camera errors
        video.onerror = () => {
            showError('Failed to access camera. Please check your permissions.');
            closeCamera();
            cameraModal.classList.add('hidden');
        };
        
    } catch (err) {
        console.error('Error accessing camera:', err);
        showError('Could not access the camera. Please check your permissions.');
        
        // Fallback to file upload
        const photoInput = document.getElementById('photo');
        if (photoInput) {
            photoInput.click();
        }
    }
}

// Close camera and stop all tracks
function closeCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
    }
    
    const video = document.getElementById('camera-feed');
    if (video) {
        video.srcObject = null;
    }
    
    const cameraModal = document.getElementById('camera-modal');
    if (cameraModal) {
        cameraModal.classList.add('hidden');
    }
}

// Capture photo from camera
function capturePhoto(video, canvas) {
    if (!video || !canvas) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to data URL
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    // Update photo preview and user profile
    updatePhotoPreview(photoDataUrl);
    
    // Close camera
    closeCamera();
    
    // Hide the camera modal
    const cameraModal = document.getElementById('camera-modal');
    if (cameraModal) {
        cameraModal.classList.add('hidden');
    }
}

// Update photo preview with captured image
function updatePhotoPreview(photoDataUrl) {
    // Update the hidden file input with the captured image
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        // Convert data URL to blob
        fetch(photoDataUrl)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
                
                // Create a new DataTransfer object and add the file
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                
                // Set the files property of the input element
                photoInput.files = dataTransfer.files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                photoInput.dispatchEvent(event);
            })
            .catch(err => {
                console.error('Error processing photo:', err);
                showError('Failed to process the photo. Please try again.');
            });
    }
    
    // Update all photo previews
    const previews = document.querySelectorAll('#photo-preview, #profile-photo');
    previews.forEach(preview => {
        preview.src = photoDataUrl;
        preview.classList.remove('hidden');
    });
    
    // Update user profile
    userProfile.photo = photoDataUrl;
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md animate-fade-in-down';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <p class="font-medium">Error</p>
                <p class="text-sm opacity-90">${message}</p>
            </div>
            <button class="ml-4 text-white opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Initialize camera when DOM is loaded
document.addEventListener('DOMContentLoaded', initCamera);
