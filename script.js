// Banking Application JavaScript

// Global variables
let currentBalance = 50000.00;
let currentLanguage = 'en';
let isVoiceActive = false;
let recognition = null;

// Language translations
const translations = {
    en: {
        bank_name: 'SecureBank',
        username_label: 'Username',
        password_label: 'Password',
        login_btn: 'Login',
        login: 'Login',
        demo_text: 'Demo: admin / password',
        welcome: 'Welcome, Admin',
        logout: 'Logout',
        account_balance: 'Account Balance',
        available_balance: 'Available Balance',
        make_payment: 'Make Payment',
        recipient_name: 'Recipient Name',
        amount: 'Amount (₹)',
        description: 'Description (Optional)',
        send_payment: 'Send Payment',
        transaction_history: 'Transaction History',
        date: 'Date',
        recipient_amount: 'Recipient/Amount',
        type: 'Type',
        status: 'Status',
        voice_ready: 'Voice Assistant Ready',
        payment_success: 'Payment sent successfully!',
        payment_error: 'Payment failed. Please try again.',
        insufficient_funds: 'Insufficient funds for this transaction.',
        voice_listening: 'Listening...',
        voice_command_processed: 'Voice command processed',
        balance_is: 'Your balance is',
        rupees: 'rupees'
    },
    hi: {
        bank_name: 'सुरक्षित बैंक',
        username_label: 'उपयोगकर्ता नाम',
        password_label: 'पासवर्ड',
        login_btn: 'लॉगिन',
        login: 'लॉगिन',
        demo_text: 'डेमो: admin / password',
        welcome: 'स्वागत, एडमिन',
        logout: 'लॉगआउट',
        account_balance: 'खाता शेष',
        available_balance: 'उपलब्ध शेष',
        make_payment: 'भुगतान करें',
        recipient_name: 'प्राप्तकर्ता का नाम',
        amount: 'राशि (₹)',
        description: 'विवरण (वैकल्पिक)',
        send_payment: 'भुगतान भेजें',
        transaction_history: 'लेनदेन का इतिहास',
        date: 'दिनांक',
        recipient_amount: 'प्राप्तकर्ता/राशि',
        type: 'प्रकार',
        status: 'स्थिति',
        voice_ready: 'वॉयस असिस्टेंट तैयार',
        payment_success: 'भुगतान सफलतापूर्वक भेजा गया!',
        payment_error: 'भुगतान असफल। कृपया पुनः प्रयास करें।',
        insufficient_funds: 'इस लेनदेन के लिए अपर्याप्त धन।',
        voice_listening: 'सुन रहा है...',
        voice_command_processed: 'वॉयस कमांड प्रोसेस किया गया',
        balance_is: 'आपका बैलेंस है',
        rupees: 'रुपये'
    },
    kn: {
        bank_name: 'ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕ್',
        username_label: 'ಬಳಕೆದಾರ ಹೆಸರು',
        password_label: 'ಪಾಸ್‌ವರ್ಡ್',
        login_btn: 'ಲಾಗಿನ್',
        login: 'ಲಾಗಿನ್',
        demo_text: 'ಡೆಮೋ: admin / password',
        welcome: 'ಸ್ವಾಗತ, ಆಡ್ಮಿನ್',
        logout: 'ಲಾಗೌಟ್',
        account_balance: 'ಖಾತೆ ಬಾಕಿ',
        available_balance: 'ಲಭ್ಯವಿರುವ ಬಾಕಿ',
        make_payment: 'ಪಾವತಿ ಮಾಡಿ',
        recipient_name: 'ಸ್ವೀಕರಿಸುವವರ ಹೆಸರು',
        amount: 'ಮೊತ್ತ (₹)',
        description: 'ವಿವರಣೆ (ಐಚ್ಛಿಕ)',
        send_payment: 'ಪಾವತಿ ಕಳುಹಿಸಿ',
        transaction_history: 'ವ್ಯವಹಾರ ಇತಿಹಾಸ',
        date: 'ದಿನಾಂಕ',
        recipient_amount: 'ಸ್ವೀಕರಿಸುವವರು/ಮೊತ್ತ',
        type: 'ಪ್ರಕಾರ',
        status: 'ಸ್ಥಿತಿ',
        voice_ready: 'ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್ ಸಿದ್ಧ',
        payment_success: 'ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!',
        payment_error: 'ಪಾವತಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        insufficient_funds: 'ಈ ವ್ಯವಹಾರಕ್ಕಾಗಿ ಅಸಮರ್ಪಕ ಹಣ.',
        voice_listening: 'ಕೇಳುತ್ತಿದೆ...',
        voice_command_processed: 'ವಾಯ್ಸ್ ಕಮಾಂಡ್ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗಿದೆ',
        balance_is: 'ನಿಮ್ಮ ಬಾಕಿ',
        rupees: 'ರುಪಾಯಿಗಳು'
    }
};

// Transaction history data
let transactions = [
    {
        id: 1,
        date: '2024-01-15',
        recipient: 'John Doe',
        amount: -2500.00,
        description: 'Online Purchase',
        type: 'Debit',
        status: 'Success'
    },
    {
        id: 2,
        date: '2024-01-14',
        recipient: 'Salary Credit',
        amount: 50000.00,
        description: 'Monthly Salary',
        type: 'Credit',
        status: 'Success'
    },
    {
        id: 3,
        date: '2024-01-13',
        recipient: 'Electric Bill',
        amount: -1200.00,
        description: 'Utility Payment',
        type: 'Debit',
        status: 'Success'
    }
];

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const languageSelect = document.getElementById('languageSelect');
const voiceBtn = document.getElementById('voiceBtn');
const logoutBtn = document.getElementById('logoutBtn');
const balanceAmount = document.getElementById('balanceAmount');
const paymentForm = document.getElementById('paymentForm');
const transactionBody = document.getElementById('transactionBody');
const voiceStatus = document.getElementById('voiceStatus');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateLanguage();
    loadTransactions();
    initializeVoiceRecognition();
});

// Initialize application
function initializeApp() {
    // Show login page by default
    showLoginPage();
    
    // Set initial language
    languageSelect.value = currentLanguage;
    
    // Update balance display
    updateBalanceDisplay();
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Language selector
    languageSelect.addEventListener('change', handleLanguageChange);
    
    // Voice button
    voiceBtn.addEventListener('click', toggleVoiceRecognition);
    
    // Logout button
    logoutBtn.addEventListener('click', handleLogout);
    
    // Payment form
    paymentForm.addEventListener('submit', handlePayment);
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple demo authentication
    if (username === 'admin' && password === 'password') {
        showDashboard();
        showNotification(translations[currentLanguage].payment_success.replace('Payment sent', 'Login'), 'success');
    } else {
        showNotification('Invalid credentials. Use admin/password', 'error');
    }
}

// Handle logout
function handleLogout() {
    showLoginPage();
    // Reset form
    loginForm.reset();
    paymentForm.reset();
}

// Show login page
function showLoginPage() {
    loginPage.classList.add('active');
    dashboardPage.classList.remove('active');
}

// Show dashboard
function showDashboard() {
    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');
}

// Handle language change
function handleLanguageChange(e) {
    currentLanguage = e.target.value;
    updateLanguage();
}

// Update language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Update transaction table headers and data
    loadTransactions();
}

// Handle payment
function handlePayment(e) {
    e.preventDefault();
    
    const recipientName = document.getElementById('recipientName').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const description = document.getElementById('paymentDescription').value || 'Payment';
    
    // Check for sufficient funds
    if (amount > currentBalance) {
        showNotification(translations[currentLanguage].insufficient_funds, 'error');
        return;
    }
    
    // Process payment
    currentBalance -= amount;
    updateBalanceDisplay();
    
    // Add to transaction history
    const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        recipient: recipientName,
        amount: -amount,
        description: description,
        type: 'Debit',
        status: 'Success'
    };
    
    transactions.unshift(newTransaction);
    loadTransactions();
    
    // Reset form
    paymentForm.reset();
    
    // Show success notification
    showNotification(translations[currentLanguage].payment_success, 'success');
}

// Update balance display
function updateBalanceDisplay() {
    balanceAmount.textContent = currentBalance.toFixed(2);
}

// Load transactions
function loadTransactions() {
    transactionBody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        const statusClass = transaction.status === 'Success' ? 'status-success' : 'status-pending';
        const typeClass = transaction.type === 'Debit' ? 'type-debit' : 'type-credit';
        const amountDisplay = transaction.amount < 0 ? 
            `- ₹${Math.abs(transaction.amount).toFixed(2)}` : 
            `+ ₹${transaction.amount.toFixed(2)}`;
        
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>
                <div style="font-weight: 600;">${transaction.recipient}</div>
                <div class="${typeClass}">${amountDisplay}</div>
            </td>
            <td>${transaction.description}</td>
            <td class="${typeClass}">${transaction.type}</td>
            <td class="${statusClass}">${transaction.status}</td>
        `;
        
        transactionBody.appendChild(row);
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize voice recognition
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getVoiceLanguage();
        
        recognition.onstart = function() {
            isVoiceActive = true;
            voiceBtn.classList.add('active');
            updateVoiceStatus(translations[currentLanguage].voice_listening);
        };
        
        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            processVoiceCommand(command);
        };
        
        recognition.onend = function() {
            isVoiceActive = false;
            voiceBtn.classList.remove('active');
            updateVoiceStatus(translations[currentLanguage].voice_ready);
        };
        
        recognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            isVoiceActive = false;
            voiceBtn.classList.remove('active');
            updateVoiceStatus(translations[currentLanguage].voice_ready);
        };
        
        updateVoiceStatus(translations[currentLanguage].voice_ready);
    } else {
        voiceBtn.style.display = 'none';
        voiceStatus.style.display = 'none';
        console.log('Speech recognition not supported');
    }
}

// Get voice language
function getVoiceLanguage() {
    const languageMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'kn': 'kn-IN'
    };
    return languageMap[currentLanguage] || 'en-US';
}

// Toggle voice recognition
function toggleVoiceRecognition() {
    if (!recognition) return;
    
    if (isVoiceActive) {
        recognition.stop();
    } else {
        recognition.lang = getVoiceLanguage();
        recognition.start();
    }
}

// Process voice commands
function processVoiceCommand(command) {
    console.log('Voice command received:', command);
    
    // Balance commands
    if (command.includes('balance') || command.includes('बैलेंस') || command.includes('ಬಾಕಿ')) {
        const balanceText = `${translations[currentLanguage].balance_is} ${currentBalance.toFixed(2)} ${translations[currentLanguage].rupees}`;
        speakText(balanceText);
        showNotification(balanceText, 'success');
    }
    // Payment commands
    else if (command.includes('payment') || command.includes('pay') || command.includes('भुगतान') || command.includes('ಪಾವತಿ')) {
        const paymentSection = document.querySelector('.payment-section');
        paymentSection.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('recipientName').focus();
        showNotification(translations[currentLanguage].voice_command_processed, 'success');
    }
    // History commands
    else if (command.includes('history') || command.includes('transaction') || command.includes('इतिहास') || command.includes('ಇತಿಹಾಸ')) {
        const historySection = document.querySelector('.history-section');
        historySection.scrollIntoView({ behavior: 'smooth' });
        showNotification(translations[currentLanguage].voice_command_processed, 'success');
    }
    // Logout commands
    else if (command.includes('logout') || command.includes('log out') || command.includes('लॉगआउट') || command.includes('ಲಾಗೌಟ್')) {
        handleLogout();
        showNotification('Logged out successfully', 'success');
    }
    else {
        showNotification('Command not recognized. Try: "show balance", "make payment", or "show history"', 'error');
    }
}

// Text-to-speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getVoiceLanguage();
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}

// Update voice status
function updateVoiceStatus(statusText) {
    const statusElement = voiceStatus.querySelector('[data-key="voice_ready"]');
    if (statusElement) {
        statusElement.textContent = statusText;
    }
    
    const icon = voiceStatus.querySelector('i');
    if (isVoiceActive) {
        icon.className = 'fas fa-microphone';
    } else {
        icon.className = 'fas fa-microphone-slash';
    }
}