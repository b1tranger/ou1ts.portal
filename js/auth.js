// Authentication Module for oU1TS Portal

const Auth = {
    currentUser: null,

    // Initialize auth state
    async init() {
        const supabase = window.supabaseClient;
        
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            await this.setUser(session.user);
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                await this.setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                this.clearUser();
            }
        });

        this.updateUI();
    },

    // Set current user and fetch profile
    async setUser(user) {
        const supabase = window.supabaseClient;
        
        // Fetch profile data
        const { data: profile } = await supabase
            .from('profiles')
            .select('student_id, email')
            .eq('id', user.id)
            .single();

        this.currentUser = {
            id: user.id,
            email: user.email,
            studentId: profile?.student_id || 'N/A'
        };

        this.updateUI();
    },

    // Clear user data
    clearUser() {
        this.currentUser = null;
        this.updateUI();
    },

    // Validate student ID (at least 10 digits)
    validateStudentId(studentId) {
        const digitsOnly = studentId.replace(/\D/g, '');
        return digitsOnly.length >= 10;
    },

    // Register new user
    async register(studentId, email, password) {
        const supabase = window.supabaseClient;

        // Validate student ID
        if (!this.validateStudentId(studentId)) {
            throw new Error('Student ID must be at least 10 digits');
        }

        // Validate email
        if (!email || !email.includes('@')) {
            throw new Error('Please enter a valid email');
        }

        // Validate password
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    student_id: studentId
                }
            }
        });

        if (error) throw error;
        return data;
    },

    // Login user
    async login(email, password) {
        const supabase = window.supabaseClient;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;
        return data;
    },

    // Logout user
    async logout() {
        const supabase = window.supabaseClient;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Update UI based on auth state
    updateUI() {
        const authBtn = document.getElementById('authBtn');
        const userInfo = document.getElementById('userInfo');
        const userDetails = document.getElementById('userDetails');
        const logoutBtn = document.getElementById('logoutBtn');

        if (!authBtn) return; // Not on a page with auth UI

        if (this.currentUser) {
            // User is logged in
            authBtn.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'flex';
                if (userDetails) {
                    userDetails.innerHTML = `
                        <span class="user-id">${this.currentUser.studentId}</span>
                        <span class="user-email">${this.currentUser.email}</span>
                    `;
                }
            }
        } else {
            // User is logged out
            authBtn.style.display = 'flex';
            if (userInfo) {
                userInfo.style.display = 'none';
            }
        }

        // Update star buttons visibility
        this.updateStarButtons();
    },

    // Show/hide star buttons based on auth state
    updateStarButtons() {
        const starButtons = document.querySelectorAll('.star-btn');
        starButtons.forEach(btn => {
            if (this.currentUser) {
                btn.classList.remove('disabled');
                btn.title = 'Click to star this resource';
            } else {
                btn.classList.add('disabled');
                btn.title = 'Login to star resources';
            }
        });
    },

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
};

// Modal functions
function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('authModalTitle');

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (mode === 'login') {
            modalTitle.textContent = 'Login';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            modalTitle.textContent = 'Register';
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        clearAuthErrors();
    }
}

function switchAuthMode(mode) {
    openAuthModal(mode);
}

function showAuthError(message) {
    const errorDiv = document.getElementById('authError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function showAuthSuccess(message) {
    const successDiv = document.getElementById('authSuccess');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }
}

function clearAuthErrors() {
    const errorDiv = document.getElementById('authError');
    const successDiv = document.getElementById('authSuccess');
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) successDiv.style.display = 'none';
}

// Form submission handlers
async function handleLogin(e) {
    e.preventDefault();
    clearAuthErrors();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        await Auth.login(email, password);
        closeAuthModal();
        
        // Reload stars if on a resource page
        if (typeof Stars !== 'undefined') {
            Stars.loadStars();
        }
    } catch (error) {
        showAuthError(error.message || 'Login failed. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    clearAuthErrors();

    const studentId = document.getElementById('registerStudentId').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Validate passwords match
    if (password !== confirmPassword) {
        showAuthError('Passwords do not match');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        await Auth.register(studentId, email, password);
        showAuthSuccess('Account created! You can now login.');
        
        // Switch to login form after short delay
        setTimeout(() => {
            switchAuthMode('login');
        }, 2000);
    } catch (error) {
        showAuthError(error.message || 'Registration failed. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    }
}

async function handleLogout() {
    try {
        await Auth.logout();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Supabase to be ready
    if (window.supabaseClient) {
        Auth.init();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (window.supabaseClient) {
                Auth.init();
            }
        }, 500);
    }
});

// Export for use in other modules
window.Auth = Auth;
