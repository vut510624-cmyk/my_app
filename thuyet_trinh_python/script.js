// ===========================================================================
// MAIN INITIALIZATION
// ===========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initLoadingScreen();
    initNavigation();
    initThemeToggle();
    initScrollProgress();
    initBackToTop();
    initModals();
    initInteractiveDemos();
    initCodeHighlighting();
    initExercises();
    initTodoApp();
    initStudentManagement();
    initQuiz();
    initPrintFunctionality();
    initFullscreenToggle();
    
    console.log('🚀 Bài 22: Kiểu Dữ Liệu Danh Sách đã sẵn sàng!');
});

// ===========================================================================
// LOADING SCREEN
// ===========================================================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    
    if (!loadingScreen || !progressBar) return;
    
    let progress = 0;
    const totalTime = 1500; // 1.5 seconds
    const interval = 30;
    const increment = (interval / totalTime) * 100;
    
    const progressInterval = setInterval(() => {
        progress += increment;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Add fade out animation
            loadingScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, interval);
}

// ===========================================================================
// NAVIGATION
// ===========================================================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.hash || '#intro';
    
    // Set active nav link based on current hash
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll lock
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to target
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, href);
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===========================================================================
// THEME TOGGLE
// ===========================================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Chuyển sang giao diện sáng';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Chuyển sang giao diện tối';
        }
    }
}

// ===========================================================================
// SCROLL PROGRESS
// ===========================================================================

function initScrollProgress() {
    const progressTrack = document.getElementById('progressTrack');
    
    if (!progressTrack) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressTrack.style.width = `${scrolled}%`;
    });
}

// ===========================================================================
// BACK TO TOP
// ===========================================================================

function initBackToTop() {
    const backToTop = document.getElementById('floatingBackToTop');
    const footerBackToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    backToTop.addEventListener('click', scrollToTop);
    if (footerBackToTop) {
        footerBackToTop.addEventListener('click', scrollToTop);
    }
}

// ===========================================================================
// MODALS
// ===========================================================================

function initModals() {
    const introModal = document.getElementById('introModal');
    const introVideoBtn = document.getElementById('introVideoBtn');
    const modalClose = document.getElementById('modalClose');
    
    if (!introModal || !introVideoBtn) return;
    
    // Open modal
    introVideoBtn.addEventListener('click', () => {
        introModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    const closeModal = () => {
        introModal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    introModal.addEventListener('click', (e) => {
        if (e.target === introModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && introModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===========================================================================
// CODE HIGHLIGHTING
// ===========================================================================

function initCodeHighlighting() {
    // Highlight all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
    
    // Copy code button functionality
    document.querySelectorAll('.btn-copy').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.result-content').querySelector('code');
            const codeText = codeBlock.textContent;
            
            navigator.clipboard.writeText(codeText).then(() => {
                // Show success feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = 'var(--success)';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                alert('Không thể sao chép code. Vui lòng thử lại.');
            });
        });
    });
}

// ===========================================================================
// INTERACTIVE DEMOS - PART 1
// ===========================================================================

function initInteractiveDemos() {
    initCreateListDemo();
    initAccessDemo();
    initSlicingDemo();
    initTraversalDemo();
    initFunctionDemo();
    initAddElementsDemo();
    initDeleteDemo();
}

function initCreateListDemo() {
    const createListBtn = document.getElementById('createListBtn');
    const listTypeSelect = document.getElementById('listType');
    const listValuesInput = document.getElementById('listValues');
    const listResult = document.getElementById('listResult');
    const listInfo = document.getElementById('listInfo');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    
    if (!createListBtn) return;
    
    createListBtn.addEventListener('click', () => {
        const listType = listTypeSelect.value;
        const inputValues = listValuesInput.value.trim();
        
        if (!inputValues) {
            showNotification('Vui lòng nhập giá trị cho danh sách!', 'error');
            return;
        }
        
        try {
            let values;
            let pythonCode;
            let explanation;
            
            switch (listType) {
                case 'numbers':
                    values = inputValues.split(',').map(v => v.trim()).filter(v => v);
                    const numbers = values.map(v => {
                        const num = Number(v);
                        if (isNaN(num)) throw new Error(`"${v}" không phải số hợp lệ`);
                        return num;
                    });
                    pythonCode = `numbers = ${JSON.stringify(numbers)}`;
                    explanation = `Danh sách số nguyên với ${numbers.length} phần tử`;
                    break;
                    
                case 'strings':
                    values = inputValues.split(',').map(v => v.trim()).filter(v => v);
                    const strings = values.map(v => `"${v}"`);
                    pythonCode = `strings = [${strings.join(', ')}]`;
                    explanation = `Danh sách chuỗi ký tự với ${strings.length} phần tử`;
                    break;
                    
                case 'mixed':
                    values = inputValues.split(',').map(v => v.trim()).filter(v => v);
                    const mixed = values.map(v => {
                        const num = Number(v);
                        return isNaN(num) ? `"${v}"` : num;
                    });
                    pythonCode = `mixed = ${JSON.stringify(mixed)}`;
                    explanation = `Danh sách hỗn hợp với ${mixed.length} phần tử`;
                    break;
                    
                case 'nested':
                    values = inputValues.split(';').map(v => v.trim()).filter(v => v);
                    const nested = values.map(row => {
                        const items = row.split(',').map(item => {
                            const trimmed = item.trim();
                            const num = Number(trimmed);
                            return isNaN(num) ? `"${trimmed}"` : num;
                        });
                        return items;
                    });
                    pythonCode = `nested = ${JSON.stringify(nested).replace(/"/g, "'")}`;
                    explanation = `Danh sách lồng nhau với ${nested.length} danh sách con`;
                    break;
            }
            
            // Update result display
            listResult.innerHTML = `<code class="python">${pythonCode}</code>`;
            listInfo.textContent = explanation;
            
            // Re-highlight the code
            hljs.highlightElement(listResult.querySelector('code'));
            
            // Show success notification
            showNotification('Đã tạo danh sách thành công!', 'success');
            
        } catch (error) {
            showNotification(`Lỗi: ${error.message}`, 'error');
        }
    });
    
    // Copy code functionality
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeText = listResult.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                showNotification('Đã sao chép code vào clipboard!', 'success');
            });
        });
    }
}

function initAccessDemo() {
    const accessBtn = document.getElementById('accessBtn');
    const accessIndexInput = document.getElementById('accessIndex');
    const accessResult = document.getElementById('accessResult');
    const currentList = document.getElementById('currentList');
    
    if (!accessBtn) return;
    
    // Sample list
    const sampleList = ["An", "Bình", "Châu", "Dũng", "Em"];
    
    accessBtn.addEventListener('click', () => {
        const index = parseInt(accessIndexInput.value);
        
        if (isNaN(index)) {
            accessResult.innerHTML = '<span style="color: var(--error)">Vui lòng nhập số hợp lệ!</span>';
            return;
        }
        
        try {
            let result;
            let color = 'var(--success)';
            
            if (index >= 0 && index < sampleList.length) {
                result = `ds[${index}] = "${sampleList[index]}"`;
            } else if (index < 0 && Math.abs(index) <= sampleList.length) {
                result = `ds[${index}] = "${sampleList[sampleList.length + index]}"`;
            } else {
                result = `IndexError: list index out of range`;
                color = 'var(--error)';
            }
            
            accessResult.innerHTML = `<span style="color: ${color}; font-family: var(--font-mono); font-weight: 600;">${result}</span>`;
            
            // Highlight the index in visualization
            highlightIndex(index);
            
        } catch (error) {
            accessResult.innerHTML = `<span style="color: var(--error)">Lỗi: ${error.message}</span>`;
        }
    });
    
    function highlightIndex(index) {
        // Remove previous highlights
        document.querySelectorAll('.index-item').forEach(item => {
            item.style.background = 'white';
            item.style.borderColor = 'var(--primary-200)';
        });
        
        // Find and highlight the corresponding element
        const elements = document.querySelectorAll('.index-item');
        let targetElement;
        
        if (index >= 0) {
            targetElement = elements[index];
        } else {
            targetElement = elements[elements.length + index];
        }
        
        if (targetElement) {
            targetElement.style.background = 'var(--primary-500)';
            targetElement.style.borderColor = 'var(--primary-500)';
            targetElement.querySelector('.item-value').style.color = 'white';
            
            // Scroll into view if needed
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function initSlicingDemo() {
    const sliceBtn = document.getElementById('sliceBtn');
    const sliceStart = document.getElementById('sliceStart');
    const sliceStop = document.getElementById('sliceStop');
    const sliceStep = document.getElementById('sliceStep');
    const sliceExpression = document.getElementById('sliceExpression');
    const sliceResult = document.getElementById('sliceResult');
    const sliceExplanation = document.getElementById('sliceExplanation');
    
    if (!sliceBtn) return;
    
    // Original list for slicing
    const originalList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    sliceBtn.addEventListener('click', () => {
        const start = parseInt(sliceStart.value);
        const stop = parseInt(sliceStop.value);
        const step = parseInt(sliceStep.value);
        
        // Validate inputs
        if (isNaN(start) || isNaN(stop) || isNaN(step)) {
            showNotification('Vui lòng nhập số hợp lệ!', 'error');
            return;
        }
        
        if (step === 0) {
            showNotification('Step không thể bằng 0!', 'error');
            return;
        }
        
        try {
            // Create slice expression
            let expression = 'ds[';
            
            if (start !== 0 || (start === 0 && stop === 10 && step === 1)) {
                expression += start;
            }
            
            expression += ':';
            
            if (stop !== 10) {
                expression += stop;
            }
            
            if (step !== 1) {
                expression += ':' + step;
            }
            
            expression += ']';
            
            // Calculate slice
            let result;
            if (step > 0) {
                // Forward slice
                const actualStart = Math.max(0, Math.min(start, originalList.length));
                const actualStop = Math.max(0, Math.min(stop, originalList.length));
                result = originalList.slice(actualStart, actualStop);
                
                // Apply step
                if (step !== 1) {
                    const steppedResult = [];
                    for (let i = 0; i < result.length; i += step) {
                        steppedResult.push(result[i]);
                    }
                    result = steppedResult;
                }
            } else {
                // Reverse slice
                const actualStart = start < 0 ? Math.max(start, -originalList.length) : Math.min(start, originalList.length - 1);
                const actualStop = stop < 0 ? Math.max(stop, -originalList.length - 1) : Math.min(stop, originalList.length);
                
                result = [];
                for (let i = actualStart; (step > 0 ? i < actualStop : i > actualStop); i += step) {
                    if (i >= 0 && i < originalList.length) {
                        result.push(originalList[i]);
                    }
                }
            }
            
            // Generate explanation
            let explanation = 'Lấy các phần tử ';
            
            if (step > 0) {
                explanation += `từ chỉ số ${start} đến ${stop}`;
                if (stop < originalList.length) {
                    explanation += ` (không bao gồm ${stop})`;
                }
            } else {
                explanation += `từ chỉ số ${start} về ${stop}`;
                if (stop > -1) {
                    explanation += ` (không bao gồm ${stop})`;
                }
            }
            
            if (Math.abs(step) !== 1) {
                explanation += `, cách nhau ${Math.abs(step)} phần tử`;
            }
            
            // Update display
            sliceExpression.textContent = expression;
            sliceResult.textContent = JSON.stringify(result);
            sliceExplanation.textContent = explanation;
            
            // Visual feedback
            sliceBtn.style.background = 'var(--success)';
            setTimeout(() => {
                sliceBtn.style.background = '';
            }, 500);
            
        } catch (error) {
            showNotification(`Lỗi: ${error.message}`, 'error');
        }
    });
    
    // Update expression on input change
    [sliceStart, sliceStop, sliceStep].forEach(input => {
        input.addEventListener('input', () => {
            sliceBtn.click();
        });
    });
}

function initTraversalDemo() {
    const startBtn = document.getElementById('startTraversal');
    const pauseBtn = document.getElementById('pauseTraversal');
    const resetBtn = document.getElementById('resetTraversal');
    const traversalMethod = document.getElementById('traversalMethod');
    const traversalSpeed = document.getElementById('traversalSpeed');
    const speedValue = document.getElementById('speedValue');
    const traversalList = document.getElementById('traversalList');
    const traversalInfo = document.getElementById('traversalInfo');
    const traversalCounts = document.getElementById('traversalCounts');
    const traversalCode = document.getElementById('traversalCode');
    
    if (!startBtn) return;
    
    // Sample data
    const sampleData = [8.5, 7.0, 9.0, 6.5, 8.0];
    let isRunning = false;
    let currentIndex = 0;
    let intervalId = null;
    let total = 0;
    let max = 0;
    
    // Initialize list display
    function initializeList() {
        traversalList.innerHTML = '';
        sampleData.forEach((value, index) => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.textContent = value;
            item.dataset.index = index;
            traversalList.appendChild(item);
        });
    }
    
    // Update speed display
    traversalSpeed.addEventListener('input', () => {
        speedValue.textContent = `${traversalSpeed.value}ms`;
    });
    
    // Start traversal
    startBtn.addEventListener('click', () => {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = true;
        
        currentIndex = 0;
        total = 0;
        max = 0;
        
        const method = traversalMethod.value;
        const speed = parseInt(traversalSpeed.value);
        
        // Update code display based on method
        updateCodeDisplay(method);
        
        // Start animation
        intervalId = setInterval(() => {
            if (currentIndex >= sampleData.length) {
                stopTraversal();
                return;
            }
            
            // Update visualization
            updateVisualization(currentIndex);
            
            // Update calculations
            const currentValue = sampleData[currentIndex];
            total += currentValue;
            max = Math.max(max, currentValue);
            const average = total / (currentIndex + 1);
            
            // Update info displays
            updateInfoDisplay(currentIndex, currentValue, method);
            traversalCounts.textContent = `Tổng: ${total.toFixed(1)} | TB: ${average.toFixed(2)} | Max: ${max.toFixed(1)}`;
            
            currentIndex++;
        }, speed);
    });
    
    // Pause traversal
    pauseBtn.addEventListener('click', () => {
        if (!isRunning) return;
        
        stopTraversal();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = false;
    });
    
    // Reset traversal
    resetBtn.addEventListener('click', () => {
        stopTraversal();
        initializeList();
        traversalInfo.textContent = 'Chưa bắt đầu';
        traversalCounts.textContent = 'Tổng: 0 | TB: 0.00 | Max: 0';
        traversalCode.textContent = 'Chọn phương pháp để xem code';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
    });
    
    function stopTraversal() {
        isRunning = false;
        clearInterval(intervalId);
        intervalId = null;
    }
    
    function updateVisualization(index) {
        // Remove active class from all items
        document.querySelectorAll('.list-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current item
        const currentItem = traversalList.querySelector(`[data-index="${index}"]`);
        if (currentItem) {
            currentItem.classList.add('active');
            currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    function updateInfoDisplay(index, value, method) {
        let info = '';
        
        switch (method) {
            case 'direct':
                info = `Đang xử lý giá trị: ${value}`;
                break;
            case 'index':
                info = `Đang xử lý phần tử thứ ${index + 1}: ds[${index}] = ${value}`;
                break;
            case 'enumerate':
                info = `Đang xử lý phần tử ${index}: giá trị = ${value}`;
                break;
        }
        
        traversalInfo.textContent = info;
    }
    
    function updateCodeDisplay(method) {
        let code = '';
        
        switch (method) {
            case 'direct':
                code = `for value in ds:\n    # Xử lý value`;
                break;
            case 'index':
                code = `for i in range(len(ds)):\n    value = ds[i]\n    # Xử lý value`;
                break;
            case 'enumerate':
                code = `for i, value in enumerate(ds):\n    # Xử lý value tại vị trí i`;
                break;
        }
        
        traversalCode.textContent = code;
    }
    
    // Initialize
    initializeList();
    resetBtn.click();
}

function initFunctionDemo() {
    const functionButtons = document.querySelectorAll('.btn-function');
    const functionResult = document.getElementById('functionResult');
    const functionTestList = document.getElementById('functionTestList');
    
    if (!functionButtons.length) return;
    
    functionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const func = button.dataset.func;
            const input = functionTestList.value.trim();
            
            if (!input) {
                showNotification('Vui lòng nhập danh sách để thử nghiệm!', 'error');
                return;
            }
            
            try {
                // Parse input list
                const list = input.split(',').map(item => {
                    const trimmed = item.trim();
                    const num = Number(trimmed);
                    return isNaN(num) ? trimmed : num;
                });
                
                let result;
                let explanation;
                
                switch (func) {
                    case 'len':
                        result = list.length;
                        explanation = `len(${JSON.stringify(list)}) = ${result}`;
                        break;
                        
                    case 'sum':
                        if (list.some(item => typeof item !== 'number')) {
                            throw new Error('Hàm sum() chỉ dùng cho danh sách số');
                        }
                        result = list.reduce((a, b) => a + b, 0);
                        explanation = `sum(${JSON.stringify(list)}) = ${result}`;
                        break;
                        
                    case 'max':
                        result = Math.max(...list.filter(item => typeof item === 'number'));
                        explanation = `max(${JSON.stringify(list)}) = ${result}`;
                        break;
                        
                    case 'min':
                        result = Math.min(...list.filter(item => typeof item === 'number'));
                        explanation = `min(${JSON.stringify(list)}) = ${result}`;
                        break;
                        
                    case 'sorted':
                        result = [...list].sort((a, b) => {
                            if (typeof a === 'number' && typeof b === 'number') {
                                return a - b;
                            }
                            return String(a).localeCompare(String(b));
                        });
                        explanation = `sorted(${JSON.stringify(list)}) = ${JSON.stringify(result)}`;
                        break;
                }
                
                functionResult.innerHTML = `
                    <div style="margin-bottom: var(--space-sm);">
                        <strong>Danh sách:</strong> ${JSON.stringify(list)}
                    </div>
                    <div style="margin-bottom: var(--space-sm);">
                        <strong>Hàm:</strong> ${func}()
                    </div>
                    <div style="margin-bottom: var(--space-sm);">
                        <strong>Kết quả:</strong> ${typeof result === 'number' ? result : JSON.stringify(result)}
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--gray-600);">
                        ${explanation}
                    </div>
                `;
                
                // Visual feedback
                button.style.background = 'var(--success)';
                button.style.color = 'white';
                setTimeout(() => {
                    button.style.background = '';
                    button.style.color = '';
                }, 500);
                
            } catch (error) {
                functionResult.innerHTML = `<span style="color: var(--error)">Lỗi: ${error.message}</span>`;
            }
        });
    });
}

// ===========================================================================
// ADD ELEMENTS DEMO
// ===========================================================================

function initAddElementsDemo() {
    const addMethod = document.getElementById('addMethod');
    const valueInput = document.getElementById('valueInput');
    const positionInput = document.getElementById('positionInput');
    const secondListInput = document.getElementById('secondListInput');
    const executeBtn = document.getElementById('executeAdd');
    const resetBtn = document.getElementById('resetAdd');
    const undoBtn = document.getElementById('undoAdd');
    const listVisual = document.getElementById('listVisual');
    const currentListDisplay = document.getElementById('currentListDisplay');
    const lastOperation = document.getElementById('lastOperation');
    const operationHistory = document.getElementById('operationHistory');
    const listLength = document.getElementById('listLength');
    const listCapacity = document.getElementById('listCapacity');
    
    if (!executeBtn) return;
    
    // Initial list
    let currentList = ['An', 'Bình', 'Châu'];
    let history = [];
    let capacity = 8; // Simulated list capacity
    
    // Initialize display
    function initializeDisplay() {
        updateListVisualization();
        updateListInfo();
        updateHistory();
        updateInputVisibility();
    }
    
    // Update input visibility based on selected method
    function updateInputVisibility() {
        const method = addMethod.value;
        
        valueInput.style.display = 'block';
        positionInput.style.display = 'none';
        secondListInput.style.display = 'none';
        
        switch (method) {
            case 'insert':
                positionInput.style.display = 'block';
                break;
            case 'concat':
                secondListInput.style.display = 'block';
                break;
        }
    }
    
    // Update list visualization
    function updateListVisualization() {
        listVisual.innerHTML = '';
        
        currentList.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'list-element';
            element.textContent = item;
            element.title = `Phần tử ${index}: "${item}"`;
            listVisual.appendChild(element);
        });
        
        // Update list display
        currentListDisplay.textContent = JSON.stringify(currentList);
        listLength.textContent = currentList.length;
        listCapacity.textContent = capacity;
        
        // Simulate capacity increase if needed
        if (currentList.length >= capacity * 0.75) {
            capacity = Math.ceil(capacity * 1.5);
        }
    }
    
    // Update list info
    function updateListInfo() {
        listLength.textContent = currentList.length;
        listCapacity.textContent = capacity;
    }
    
    // Update history
    function updateHistory() {
        operationHistory.innerHTML = '';
        
        history.slice(0, 5).forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = item;
            if (index === 0) {
                historyItem.style.background = 'var(--primary-50)';
                historyItem.style.color = 'var(--primary-700)';
                historyItem.style.fontWeight = '500';
            }
            operationHistory.appendChild(historyItem);
        });
    }
    
    // Execute add operation
    executeBtn.addEventListener('click', () => {
        const method = addMethod.value;
        const value = document.getElementById('addValue').value.trim();
        const position = parseInt(document.getElementById('addPosition').value) || 0;
        const secondList = document.getElementById('secondList')?.value.trim() || '';
        
        if (!value && method !== 'concat') {
            showNotification('Vui lòng nhập giá trị!', 'error');
            return;
        }
        
        try {
            let operation;
            let newElement = null;
            
            // Save current state for undo
            const previousState = [...currentList];
            
            switch (method) {
                case 'append':
                    currentList.push(value);
                    operation = `append("${value}")`;
                    newElement = { value, type: 'append' };
                    break;
                    
                case 'insert':
                    const insertPos = Math.max(0, Math.min(position, currentList.length));
                    currentList.splice(insertPos, 0, value);
                    operation = `insert(${insertPos}, "${value}")`;
                    newElement = { value, type: 'insert', position: insertPos };
                    break;
                    
                case 'extend':
                    const values = value.split(',').map(v => v.trim()).filter(v => v);
                    currentList.push(...values);
                    operation = `extend([${values.map(v => `"${v}"`).join(', ')}])`;
                    newElement = { values, type: 'extend' };
                    break;
                    
                case 'concat':
                    const secondValues = secondList.split(',').map(v => v.trim()).filter(v => v);
                    const newList = [...currentList, ...secondValues];
                    operation = `ds + [${secondValues.map(v => `"${v}"`).join(', ')}]`;
                    
                    // Show new list in a special way
                    updateListVisualization();
                    currentList = newList;
                    newElement = { values: secondValues, type: 'concat' };
                    break;
            }
            
            // Add to history
            history.unshift(operation);
            if (history.length > 5) history.pop();
            
            // Update displays
            updateListVisualization();
            updateListInfo();
            updateHistory();
            lastOperation.textContent = operation;
            
            // Highlight new element
            if (newElement) {
                highlightNewElement(newElement);
            }
            
            // Enable undo button
            undoBtn.disabled = false;
            undoBtn.dataset.previousState = JSON.stringify(previousState);
            
            // Clear inputs
            document.getElementById('addValue').value = '';
            if (secondListInput.style.display !== 'none') {
                document.getElementById('secondList').value = '';
            }
            
            showNotification(`Đã thực hiện: ${operation}`, 'success');
            
        } catch (error) {
            showNotification(`Lỗi: ${error.message}`, 'error');
        }
    });
    
    // Reset list
    resetBtn.addEventListener('click', () => {
        currentList = ['An', 'Bình', 'Châu'];
        history = [];
        capacity = 8;
        
        initializeDisplay();
        lastOperation.textContent = 'Chưa có thao tác nào';
        undoBtn.disabled = true;
        
        showNotification('Đã reset danh sách về trạng thái ban đầu', 'info');
    });
    
    // Undo last operation
    undoBtn.addEventListener('click', () => {
        if (undoBtn.dataset.previousState) {
            currentList = JSON.parse(undoBtn.dataset.previousState);
            history.shift(); // Remove last operation from history
            
            initializeDisplay();
            lastOperation.textContent = history[0] || 'Chưa có thao tác nào';
            undoBtn.disabled = true;
            
            showNotification('Đã hoàn tác thao tác cuối cùng', 'info');
        }
    });
    
    // Highlight new element
    function highlightNewElement(element) {
        const elements = listVisual.querySelectorAll('.list-element');
        
        switch (element.type) {
            case 'append':
                const lastElement = elements[elements.length - 1];
                if (lastElement) {
                    animateElement(lastElement, 'new');
                }
                break;
                
            case 'insert':
                if (element.position < elements.length) {
                    const insertedElement = elements[element.position];
                    if (insertedElement) {
                        animateElement(insertedElement, 'inserted');
                    }
                }
                break;
                
            case 'extend':
            case 'concat':
                // Highlight all new elements
                for (let i = currentList.length - (element.values?.length || 0); i < currentList.length; i++) {
                    const newElement = elements[i];
                    if (newElement) {
                        animateElement(newElement, 'new');
                    }
                }
                break;
        }
    }
    
    // Animate element with specific class
    function animateElement(element, className) {
        element.classList.add(className);
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        setTimeout(() => {
            element.classList.remove(className);
        }, 1000);
    }
    
    // Initialize
    addMethod.addEventListener('change', updateInputVisibility);
    initializeDisplay();
}

// ===========================================================================
// DELETE DEMO
// ===========================================================================

function initDeleteDemo() {
    const deleteMethod = document.getElementById('deleteMethod');
    const deleteValueGroup = document.getElementById('deleteValueGroup');
    const deleteIndexGroup = document.getElementById('deleteIndexGroup');
    const executeDelete = document.getElementById('executeDelete');
    const deleteListItems = document.getElementById('deleteListItems');
    const deleteResult = document.getElementById('deleteResult');
    
    if (!executeDelete) return;
    
    // Sample list
    let sampleList = ['Python', 'Java', 'C++', 'JavaScript', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust'];
    
    // Initialize list display
    function initializeDeleteList() {
        deleteListItems.innerHTML = '';
        
        sampleList.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'delete-item';
            element.textContent = item;
            element.dataset.index = index;
            element.dataset.value = item;
            deleteListItems.appendChild(element);
        });
    }
    
    // Update input visibility based on selected method
    function updateDeleteInputVisibility() {
        const method = deleteMethod.value;
        
        deleteValueGroup.style.display = method === 'remove' ? 'block' : 'none';
        deleteIndexGroup.style.display = method === 'pop' ? 'block' : 'none';
    }
    
    // Execute delete operation
    executeDelete.addEventListener('click', () => {
        const method = deleteMethod.value;
        const value = document.getElementById('deleteValue')?.value.trim() || '';
        const index = parseInt(document.getElementById('deleteIndex')?.value) || 0;
        
        try {
            let operation;
            let deletedItem;
            
            switch (method) {
                case 'remove':
                    if (!value) {
                        showNotification('Vui lòng nhập giá trị cần xóa!', 'error');
                        return;
                    }
                    
                    const removeIndex = sampleList.indexOf(value);
                    if (removeIndex === -1) {
                        throw new Error(`Không tìm thấy "${value}" trong danh sách`);
                    }
                    
                    deletedItem = sampleList[removeIndex];
                    sampleList.splice(removeIndex, 1);
                    operation = `remove("${value}")`;
                    break;
                    
                case 'pop':
                    if (index < 0 || index >= sampleList.length) {
                        throw new Error(`Chỉ số ${index} nằm ngoài phạm vi danh sách`);
                    }
                    
                    deletedItem = sampleList[index];
                    sampleList.splice(index, 1);
                    operation = `pop(${index})`;
                    break;
                    
                case 'clear':
                    const count = sampleList.length;
                    sampleList = [];
                    operation = `clear() - đã xóa ${count} phần tử`;
                    break;
            }
            
            // Update display
            initializeDeleteList();
            
            // Show result
            if (method !== 'clear') {
                deleteResult.innerHTML = `
                    <div style="color: var(--success); font-weight: 600;">
                        Đã thực hiện: ${operation}
                    </div>
                    <div style="margin-top: var(--space-sm);">
                        Đã xóa: <strong>"${deletedItem}"</strong>
                    </div>
                    <div style="margin-top: var(--space-sm);">
                        Danh sách còn lại: ${sampleList.length} phần tử
                    </div>
                `;
            } else {
                deleteResult.innerHTML = `
                    <div style="color: var(--success); font-weight: 600;">
                        Đã thực hiện: ${operation}
                    </div>
                    <div style="margin-top: var(--space-sm);">
                        Danh sách hiện tại: []
                    </div>
                `;
            }
            
            // Visual feedback
            executeDelete.style.background = 'var(--success)';
            setTimeout(() => {
                executeDelete.style.background = '';
            }, 500);
            
            // Clear inputs
            if (document.getElementById('deleteValue')) {
                document.getElementById('deleteValue').value = '';
            }
            
        } catch (error) {
            deleteResult.innerHTML = `<span style="color: var(--error)">Lỗi: ${error.message}</span>`;
        }
    });
    
    // Initialize
    deleteMethod.addEventListener('change', updateDeleteInputVisibility);
    initializeDeleteList();
    updateDeleteInputVisibility();
}

// ===========================================================================
// STUDENT MANAGEMENT SYSTEM
// ===========================================================================

function initStudentManagement() {
    const actionButtons = document.querySelectorAll('.btn-action');
    const studentForm = document.getElementById('studentForm');
    const closeForm = document.getElementById('closeForm');
    const saveStudent = document.getElementById('saveStudent');
    const cancelStudent = document.getElementById('cancelStudent');
    const searchStudent = document.getElementById('searchStudent');
    const studentTableBody = document.getElementById('studentTableBody');
    const totalStudentsCount = document.getElementById('totalStudentsCount');
    const maleCount = document.getElementById('maleCount');
    const femaleCount = document.getElementById('femaleCount');
    
    if (!actionButtons.length) return;
    
    // Sample student data
    let students = [
        { id: 1, name: 'Nguyễn Văn An', gender: 'Nam', birth: '2006-05-15', score: 8.5 },
        { id: 2, name: 'Trần Thị Bình', gender: 'Nữ', birth: '2006-03-22', score: 7.0 },
        { id: 3, name: 'Lê Văn Châu', gender: 'Nam', birth: '2006-08-10', score: 9.0 },
        { id: 4, name: 'Phạm Thị Dung', gender: 'Nữ', birth: '2006-11-05', score: 6.5 },
        { id: 5, name: 'Hoàng Văn Em', gender: 'Nam', birth: '2006-02-28', score: 8.0 }
    ];
    
    let nextId = 6;
    let currentAction = null;
    let currentEditId = null;
    
    // Initialize student table
    function initializeStudentTable() {
        renderStudentTable();
        updateStats();
    }
    
    // Render student table
    function renderStudentTable(filteredStudents = students) {
        studentTableBody.innerHTML = '';
        
        if (filteredStudents.length === 0) {
            studentTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: var(--space-xl); color: var(--gray-500);">
                        <i class="fas fa-user-slash" style="font-size: 2rem; margin-bottom: var(--space-sm); display: block;"></i>
                        Không tìm thấy học sinh nào
                    </td>
                </tr>
            `;
            return;
        }
        
        filteredStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td><strong>${student.name}</strong></td>
                <td>
                    <span class="gender-badge ${student.gender === 'Nam' ? 'male' : 'female'}">
                        ${student.gender}
                    </span>
                </td>
                <td>${formatDate(student.birth)}</td>
                <td>
                    <span class="score-badge ${getScoreClass(student.score)}">
                        ${student.score.toFixed(1)}
                    </span>
                </td>
                <td>
                    <button class="btn-action-small edit" data-id="${student.id}" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action-small delete" data-id="${student.id}" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.btn-action-small.edit').forEach(btn => {
            btn.addEventListener('click', () => editStudent(parseInt(btn.dataset.id)));
        });
        
        document.querySelectorAll('.btn-action-small.delete').forEach(btn => {
            btn.addEventListener('click', () => deleteStudent(parseInt(btn.dataset.id)));
        });
    }
    
    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }
    
    // Get score class for styling
    function getScoreClass(score) {
        if (score >= 8.0) return 'excellent';
        if (score >= 6.5) return 'good';
        return 'average';
    }
    
    // Update statistics
    function updateStats() {
        const total = students.length;
        const male = students.filter(s => s.gender === 'Nam').length;
        const female = total - male;
        
        totalStudentsCount.textContent = total;
        maleCount.textContent = male;
        femaleCount.textContent = female;
    }
    
    // Show student form
    function showStudentForm(action, student = null) {
        currentAction = action;
        
        const formTitle = studentForm.querySelector('h6');
        const nameInput = document.getElementById('studentName');
        const genderSelect = document.getElementById('studentGender');
        const birthInput = document.getElementById('studentBirth');
        const scoreInput = document.getElementById('studentScore');
        
        if (action === 'add') {
            formTitle.textContent = 'Thêm học sinh mới';
            nameInput.value = '';
            genderSelect.value = 'Nam';
            birthInput.value = '';
            scoreInput.value = '7.0';
            currentEditId = null;
        } else if (action === 'edit' && student) {
            formTitle.textContent = 'Sửa thông tin học sinh';
            nameInput.value = student.name;
            genderSelect.value = student.gender;
            birthInput.value = student.birth;
            scoreInput.value = student.score;
            currentEditId = student.id;
        }
        
        studentForm.style.display = 'block';
        studentForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Hide student form
    function hideStudentForm() {
        studentForm.style.display = 'none';
        currentAction = null;
        currentEditId = null;
    }
    
    // Save student
    saveStudent.addEventListener('click', () => {
        const name = document.getElementById('studentName').value.trim();
        const gender = document.getElementById('studentGender').value;
        const birth = document.getElementById('studentBirth').value;
        const score = parseFloat(document.getElementById('studentScore').value);
        
        // Validation
        if (!name) {
            showNotification('Vui lòng nhập họ tên học sinh!', 'error');
            return;
        }
        
        if (!birth) {
            showNotification('Vui lòng chọn ngày sinh!', 'error');
            return;
        }
        
        if (isNaN(score) || score < 0 || score > 10) {
            showNotification('Điểm số phải từ 0 đến 10!', 'error');
            return;
        }
        
        if (currentAction === 'add') {
            // Add new student
            const newStudent = {
                id: nextId++,
                name,
                gender,
                birth,
                score
            };
            students.push(newStudent);
            showNotification(`Đã thêm học sinh: ${name}`, 'success');
        } else if (currentAction === 'edit' && currentEditId) {
            // Edit existing student
            const index = students.findIndex(s => s.id === currentEditId);
            if (index !== -1) {
                students[index] = { ...students[index], name, gender, birth, score };
                showNotification(`Đã cập nhật học sinh: ${name}`, 'success');
            }
        }
        
        // Update display and hide form
        initializeStudentTable();
        hideStudentForm();
    });
    
    // Edit student
    function editStudent(id) {
        const student = students.find(s => s.id === id);
        if (student) {
            showStudentForm('edit', student);
        }
    }
    
    // Delete student
    function deleteStudent(id) {
        if (confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
            const index = students.findIndex(s => s.id === id);
            if (index !== -1) {
                const studentName = students[index].name;
                students.splice(index, 1);
                initializeStudentTable();
                showNotification(`Đã xóa học sinh: ${studentName}`, 'success');
            }
        }
    }
    
    // Cancel student form
    cancelStudent.addEventListener('click', hideStudentForm);
    closeForm.addEventListener('click', hideStudentForm);
    
    // Search functionality
    searchStudent.addEventListener('input', () => {
        const searchTerm = searchStudent.value.toLowerCase().trim();
        
        if (!searchTerm) {
            renderStudentTable(students);
            return;
        }
        
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm) ||
            student.gender.toLowerCase().includes(searchTerm) ||
            student.score.toString().includes(searchTerm)
        );
        
        renderStudentTable(filtered);
    });
    
    // Action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            
            switch (action) {
                case 'add':
                    showStudentForm('add');
                    break;
                    
                case 'remove':
                    // In a real app, you might want to select a student first
                    showNotification('Vui lòng chọn học sinh cần xóa từ bảng', 'info');
                    break;
                    
                case 'insert':
                    showNotification('Tính năng chèn học sinh đang được phát triển', 'info');
                    break;
                    
                case 'sort':
                    students.sort((a, b) => b.score - a.score);
                    initializeStudentTable();
                    showNotification('Đã sắp xếp học sinh theo điểm giảm dần', 'success');
                    break;
                    
                case 'clear':
                    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách học sinh?')) {
                        students = [];
                        initializeStudentTable();
                        showNotification('Đã xóa toàn bộ danh sách học sinh', 'success');
                    }
                    break;
            }
        });
    });
    
    // Add CSS for badges
    const style = document.createElement('style');
    style.textContent = `
        .gender-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: var(--radius-sm);
            font-size: 0.85rem;
            font-weight: 600;
        }
        .gender-badge.male {
            background: rgba(33, 150, 243, 0.1);
            color: var(--primary-600);
        }
        .gender-badge.female {
            background: rgba(233, 30, 99, 0.1);
            color: var(--secondary-600);
        }
        .score-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: var(--radius-sm);
            font-size: 0.85rem;
            font-weight: 600;
            font-family: var(--font-mono);
        }
        .score-badge.excellent {
            background: rgba(76, 175, 80, 0.1);
            color: var(--success);
        }
        .score-badge.good {
            background: rgba(255, 152, 0, 0.1);
            color: var(--warning);
        }
        .score-badge.average {
            background: rgba(244, 67, 54, 0.1);
            color: var(--error);
        }
        .btn-action-small {
            width: 32px;
            height: 32px;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            margin: 0 2px;
            transition: all var(--transition-fast);
        }
        .btn-action-small.edit {
            background: var(--primary-100);
            color: var(--primary-600);
        }
        .btn-action-small.edit:hover {
            background: var(--primary-200);
        }
        .btn-action-small.delete {
            background: rgba(244, 67, 54, 0.1);
            color: var(--error);
        }
        .btn-action-small.delete:hover {
            background: rgba(244, 67, 54, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize
    initializeStudentTable();
}

// ===========================================================================
// EXERCISES
// ===========================================================================

function initExercises() {
    initExercise1();
    initExercise2();
    initExercise3();
}

function initExercise1() {
    const runBtn = document.getElementById('runExercise1');
    const resetBtn = document.getElementById('resetExercise1');
    const codeTextarea = document.getElementById('codeExercise1');
    const outputDiv = document.getElementById('outputExercise1');
    const solutionBtn = document.querySelector('[data-target="solution1"]');
    
    if (!runBtn) return;
    
    // Default code
    const defaultCode = `# Bài 1: Tính tổng và trung bình điểm số
diem = [7.5, 8.0, 6.5, 9.0, 8.5, 7.0, 9.5, 8.0]

# TODO: Tính tổng điểm
tong = 0
for d in diem:
    tong += d

# TODO: Tính điểm trung bình
trung_binh = tong / len(diem)

# TODO: Tìm điểm cao nhất và thấp nhất
# Gợi ý: Sử dụng vòng lặp hoặc hàm max/min
cao_nhat = max(diem)
thap_nhat = min(diem)

# In kết quả
print("=== KẾT QUẢ BÀI 1 ===")
print(f"Tổng điểm: {tong}")
print(f"Điểm trung bình: {trung_binh:.2f}")
print(f"Điểm cao nhất: {cao_nhat}")
print(f"Điểm thấp nhất: {thap_nhat}")`;
    
    // Run code
    runBtn.addEventListener('click', () => {
        const code = codeTextarea.value;
        let output = '';
        
        try {
            // Capture console.log output
            const originalLog = console.log;
            console.log = function(...args) {
                output += args.map(arg => String(arg)).join(' ') + '\\n';
            };
            
            // Execute the code
            eval(code);
            
            // Restore original console.log
            console.log = originalLog;
            
            // Display output
            if (output) {
                outputDiv.querySelector('.output-content').textContent = output;
            } else {
                outputDiv.querySelector('.output-content').textContent = 'Code chạy thành công nhưng không có output.';
            }
            
            showNotification('Code chạy thành công!', 'success');
            
        } catch (error) {
            outputDiv.querySelector('.output-content').textContent = `Lỗi: ${error.message}`;
            showNotification(`Lỗi: ${error.message}`, 'error');
        }
    });
    
    // Reset code
    resetBtn.addEventListener('click', () => {
        codeTextarea.value = defaultCode;
        outputDiv.querySelector('.output-content').textContent = 'Kết quả sẽ hiển thị ở đây...';
        showNotification('Đã reset code về mẫu ban đầu', 'info');
    });
    
    // Show solution
    if (solutionBtn) {
        solutionBtn.addEventListener('click', () => {
            const solutionDiv = document.getElementById('solution1');
            solutionDiv.style.display = solutionDiv.style.display === 'none' ? 'block' : 'none';
            
            if (solutionDiv.style.display === 'block') {
                solutionBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ẩn lời giải';
            } else {
                solutionBtn.innerHTML = '<i class="fas fa-eye"></i> Xem lời giải mẫu';
            }
        });
    }
}

function initExercise2() {
    const runBtn = document.getElementById('runExercise2');
    const resetBtn = document.getElementById('resetExercise2');
    const codeTextarea = document.getElementById('codeExercise2');
    const outputDiv = document.getElementById('outputExercise2');
    const solutionBtn = document.querySelector('[data-target="solution2"]');
    
    if (!runBtn) return;
    
    // Default code
    const defaultCode = `# Bài 2: Lọc và phân loại học sinh
hoc_sinh = ["An", "Bình", "Châu", "Dũng", "Em", "Phúc", "Giang", "Huy"]
diem = [8.5, 7.0, 9.0, 6.5, 8.0, 7.5, 5.5, 9.5]

# TODO: 1. In danh sách học sinh có điểm ≥ 8.0
print("1. Học sinh giỏi (điểm ≥ 8.0):")
for i in range(len(hoc_sinh)):
    if diem[i] >= 8.0:
        print(f"  - {hoc_sinh[i]}: {diem[i]} điểm")

# TODO: 2. Tính điểm trung bình của học sinh giỏi
tong_gioi = 0
dem_gioi = 0
for d in diem:
    if d >= 8.0:
        tong_gioi += d
        dem_gioi += 1
if dem_gioi > 0:
    tb_gioi = tong_gioi / dem_gioi
else:
    tb_gioi = 0
print(f"\\n2. Điểm trung bình học sinh giỏi: {tb_gioi:.2f}")

# TODO: 3. Đếm số học sinh mỗi loại
dem_gioi = dem_kha = dem_tb = 0
for d in diem:
    if d >= 8.0:
        dem_gioi += 1
    elif d >= 6.5:
        dem_kha += 1
    else:
        dem_tb += 1

print("\\n3. Phân loại học sinh:")
print(f"   Giỏi (≥ 8.0): {dem_gioi} học sinh")
print(f"   Khá (6.5-7.9): {dem_kha} học sinh")
print(f"   Trung bình (&lt;6.5): {dem_tb} học sinh")`;
    
    // Run code
    runBtn.addEventListener('click', () => {
        const code = codeTextarea.value;
        let output = '';
        
        try {
            // Capture console.log output
            const originalLog = console.log;
            console.log = function(...args) {
                output += args.map(arg => String(arg)).join(' ') + '\\n';
            };
            
            // Execute the code
            eval(code);
            
            // Restore original console.log
            console.log = originalLog;
            
            // Display output
            if (output) {
                outputDiv.querySelector('.output-content').textContent = output;
            } else {
                outputDiv.querySelector('.output-content').textContent = 'Code chạy thành công nhưng không có output.';
            }
            
            showNotification('Code chạy thành công!', 'success');
            
        } catch (error) {
            outputDiv.querySelector('.output-content').textContent = `Lỗi: ${error.message}`;
            showNotification(`Lỗi: ${error.message}`, 'error');
        }
    });
    
    // Reset code
    resetBtn.addEventListener('click', () => {
        codeTextarea.value = defaultCode;
        outputDiv.querySelector('.output-content').textContent = 'Kết quả sẽ hiển thị ở đây...';
        showNotification('Đã reset code về mẫu ban đầu', 'info');
    });
    
    // Show solution
    if (solutionBtn) {
        solutionBtn.addEventListener('click', () => {
            const solutionDiv = document.getElementById('solution2');
            solutionDiv.style.display = solutionDiv.style.display === 'none' ? 'block' : 'none';
            
            if (solutionDiv.style.display === 'block') {
                solutionBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ẩn lời giải';
            } else {
                solutionBtn.innerHTML = '<i class="fas fa-eye"></i> Xem lời giải mẫu';
            }
        });
    }
}

function initExercise3() {
    const runBtn = document.getElementById('runExercise3');
    const resetBtn = document.getElementById('resetExercise3');
    const testBtn = document.getElementById('testExercise3');
    const codeTextarea = document.getElementById('codeExercise3');
    const outputDiv = document.getElementById('outputExercise3');
    const solutionBtn = document.querySelector('[data-target="solution3"]');
    
    if (!runBtn) return;
    
    // Default code
    const defaultCode = `# Bài 3: Quản lý sản phẩm
class QuanLySanPham:
    def __init__(self):
        # Danh sách sản phẩm, mỗi sản phẩm là một dictionary
        self.san_pham = [
            {"ten": "Laptop", "gia": 15000000, "so_luong": 10},
            {"ten": "Điện thoại", "gia": 8000000, "so_luong": 20},
            {"ten": "Tablet", "gia": 5000000, "so_luong": 15}
        ]
    
    def them_san_pham(self, ten, gia, so_luong):
        """Thêm sản phẩm mới vào danh sách"""
        # TODO: Viết code thêm sản phẩm mới
        sp_moi = {"ten": ten, "gia": gia, "so_luong": so_luong}
        self.san_pham.append(sp_moi)
        print(f"Đã thêm sản phẩm: {ten}")
    
    def tim_san_pham(self, ten):
        """Tìm sản phẩm theo tên"""
        # TODO: Duyệt danh sách để tìm sản phẩm
        for sp in self.san_pham:
            if sp["ten"].lower() == ten.lower():
                return sp
        return None
    
    def sap_xep_theo_gia(self, giam_dan=False):
        """Sắp xếp sản phẩm theo giá"""
        # TODO: Sắp xếp danh sách sản phẩm theo giá
        self.san_pham.sort(key=lambda x: x["gia"], reverse=giam_dan)
        print("Đã sắp xếp sản phẩm theo giá")
    
    def thong_ke(self):
        """Thống kê tổng giá trị kho"""
        # TODO: Tính tổng giá trị kho (giá × số lượng)
        tong_gia_tri = 0
        for sp in self.san_pham:
            tong_gia_tri += sp["gia"] * sp["so_luong"]
        return tong_gia_tri
    
    def xoa_het_hang(self):
        """Xóa sản phẩm hết hàng (số lượng = 0)"""
        # TODO: Xóa các sản phẩm có số lượng = 0
        # Gợi ý: Tạo danh sách mới chỉ chứa sản phẩm còn hàng
        sp_con_hang = []
        for sp in self.san_pham:
            if sp["so_luong"] > 0:
                sp_con_hang.append(sp)
        so_sp_da_xoa = len(self.san_pham) - len(sp_con_hang)
        self.san_pham = sp_con_hang
        return so_sp_da_xoa

# Chương trình chính
if __name__ == "__main__":
    ql = QuanLySanPham()
    
    # Test các chức năng
    print("=== QUẢN LÝ SẢN PHẨM ===")
    
    # Thêm sản phẩm mới
    ql.them_san_pham("Tai nghe", 500000, 30)
    ql.them_san_pham("Chuột", 300000, 0)  # Hết hàng
    
    # Tìm sản phẩm
    sp = ql.tim_san_pham("Laptop")
    if sp:
        print(f"\\nTìm thấy: {sp['ten']} - Giá: {sp['gia']:,}đ")
    
    # Sắp xếp
    ql.sap_xep_theo_gia(giam_dan=True)
    print("\\nDanh sách sản phẩm sau khi sắp xếp:")
    for sp in ql.san_pham:
        print(f"  - {sp['ten']}: {sp['gia']:,}đ")
    
    # Thống kê
    tong = ql.thong_ke()
    print(f"\\nTổng giá trị kho: {tong:,}đ")
    
    # Xóa sản phẩm hết hàng
    so_sp_xoa = ql.xoa_het_hang()
    print(f"\\nĐã xóa {so_sp_xoa} sản phẩm hết hàng")
    print(f"Số sản phẩm còn lại: {len(ql.san_pham)}")`;
    
    // Run code
    runBtn.addEventListener('click', () => {
        const code = codeTextarea.value;
        let output = '';
        
        try {
            // Capture console.log output
            const originalLog = console.log;
            console.log = function(...args) {
                output += args.map(arg => {
                    if (typeof arg === 'object') {
                        return JSON.stringify(arg, null, 2);
                    }
                    return String(arg);
                }).join(' ') + '\\n';
            };
            
            // Execute the code
            eval(code);
            
            // Restore original console.log
            console.log = originalLog;
            
            // Display output
            if (output) {
                outputDiv.querySelector('.output-content').textContent = output;
            } else {
                outputDiv.querySelector('.output-content').textContent = 'Code chạy thành công nhưng không có output.';
            }
            
            showNotification('Code chạy thành công!', 'success');
            
        } catch (error) {
            outputDiv.querySelector('.output-content').textContent = `Lỗi: ${error.message}`;
            showNotification(`Lỗi: ${error.message}`, 'error');
        }
    });
    
    // Test code
    testBtn.addEventListener('click', () => {
        const tests = [
            {
                name: 'Kiểm tra thêm sản phẩm',
                code: `
ql = QuanLySanPham()
original_count = len(ql.san_pham)
ql.them_san_pham("Test Product", 100000, 5)
new_count = len(ql.san_pham)
print(f"✓ Thêm sản phẩm: {original_count} → {new_count} sản phẩm")
assert new_count == original_count + 1, "Lỗi: Số lượng sản phẩm không tăng"
`
            },
            {
                name: 'Kiểm tra tìm sản phẩm',
                code: `
ql = QuanLySanPham()
result = ql.tim_san_pham("Laptop")
print(f"✓ Tìm sản phẩm 'Laptop': {'Tìm thấy' if result else 'Không tìm thấy'}")
assert result is not None, "Lỗi: Không tìm thấy sản phẩm 'Laptop'"
assert result['ten'] == 'Laptop', "Lỗi: Tên sản phẩm không khớp"
`
            },
            {
                name: 'Kiểm tra xóa hết hàng',
                code: `
ql = QuanLySanPham()
ql.them_san_pham("Sản phẩm hết hàng", 50000, 0)
before_count = len(ql.san_pham)
deleted = ql.xoa_het_hang()
after_count = len(ql.san_pham)
print(f"✓ Xóa hết hàng: Đã xóa {deleted} sản phẩm, {before_count} → {after_count}")
assert after_count == before_count - deleted, "Lỗi: Số lượng sản phẩm không giảm đúng"
`
            }
        ];
        
        let output = '=== KIỂM TRA TỰ ĐỘNG ===\\n\\n';
        let passed = 0;
        let total = tests.length;
        
        tests.forEach((test, index) => {
            output += `${index + 1}. ${test.name}\\n`;
            
            try {
                // Create a new instance for each test
                const testCode = `
class QuanLySanPham:
    def __init__(self):
        self.san_pham = [
            {"ten": "Laptop", "gia": 15000000, "so_luong": 10},
            {"ten": "Điện thoại", "gia": 8000000, "so_luong": 20},
            {"ten": "Tablet", "gia": 5000000, "so_luong": 15}
        ]
    
    def them_san_pham(self, ten, gia, so_luong):
        sp_moi = {"ten": ten, "gia": gia, "so_luong": so_luong}
        self.san_pham.append(sp_moi)
        print(f"Đã thêm sản phẩm: {ten}")
    
    def tim_san_pham(self, ten):
        for sp in self.san_pham:
            if sp["ten"].lower() == ten.lower():
                return sp
        return None
    
    def sap_xep_theo_gia(self, giam_dan=False):
        self.san_pham.sort(key=lambda x: x["gia"], reverse=giam_dan)
        print("Đã sắp xếp sản phẩm theo giá")
    
    def thong_ke(self):
        tong_gia_tri = 0
        for sp in self.san_pham:
            tong_gia_tri += sp["gia"] * sp["so_luong"]
        return tong_gia_tri
    
    def xoa_het_hang(self):
        sp_con_hang = []
        for sp in self.san_pham:
            if sp["so_luong"] > 0:
                sp_con_hang.append(sp)
        so_sp_da_xoa = len(self.san_pham) - len(sp_con_hang)
        self.san_pham = sp_con_hang
        return so_sp_da_xoa
${test.code}
`;
                
                eval(testCode);
                output += '   ✅ PASSED\\n\\n';
                passed++;
            } catch (error) {
                output += `   ❌ FAILED: ${error.message}\\n\\n`;
            }
        });
        
        output += `=== KẾT QUẢ: ${passed}/${total} bài test passed ===`;
        outputDiv.querySelector('.output-content').textContent = output;
        
        if (passed === total) {
            showNotification(`Tất cả ${total} bài test đều passed! 🎉`, 'success');
        } else {
            showNotification(`${passed}/${total} bài test passed. Cần kiểm tra lại code.`, 'warning');
        }
    });
    
    // Reset code
    resetBtn.addEventListener('click', () => {
        codeTextarea.value = defaultCode;
        outputDiv.querySelector('.output-content').textContent = 'Kết quả sẽ hiển thị ở đây...';
        showNotification('Đã reset code về mẫu ban đầu', 'info');
    });
    
    // Show solution
    if (solutionBtn) {
        solutionBtn.addEventListener('click', () => {
            const solutionDiv = document.getElementById('solution3');
            solutionDiv.style.display = solutionDiv.style.display === 'none' ? 'block' : 'none';
            
            if (solutionDiv.style.display === 'block') {
                solutionBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ẩn lời giải';
            } else {
                solutionBtn.innerHTML = '<i class="fas fa-eye"></i> Xem lời giải mẫu';
            }
        });
    }
}

// ===========================================================================
// TODO APP
// ===========================================================================

function initTodoApp() {
    const todoInput = document.getElementById('newTodo');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const todoTotal = document.getElementById('todoTotal');
    const todoCompleted = document.getElementById('todoCompleted');
    const todoPending = document.getElementById('todoPending');
    
    if (!addTodoBtn) return;
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';
    
    // Initialize
    function initializeTodoApp() {
        renderTodos();
        updateStats();
    }
    
    // Render todos based on current filter
    function renderTodos() {
        let filteredTodos = todos;
        
        switch (currentFilter) {
            case 'active':
                filteredTodos = todos.filter(todo => !todo.completed);
                break;
            case 'completed':
                filteredTodos = todos.filter(todo => todo.completed);
                break;
        }
        
        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <div class="todo-empty">
                    <i class="fas fa-clipboard-list"></i>
                    <p>${getEmptyMessage()}</p>
                </div>
            `;
            return;
        }
        
        todoList.innerHTML = filteredTodos.map((todo, index) => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                           onchange="toggleTodo(${todo.id})">
                </div>
                <div class="todo-content">
                    <span class="todo-text">${todo.text}</span>
                    <span class="todo-date">${formatTodoDate(todo.createdAt)}</span>
                </div>
                <div class="todo-actions">
                    <button class="todo-delete" onclick="deleteTodo(${todo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Get empty message based on filter
    function getEmptyMessage() {
        switch (currentFilter) {
            case 'active':
                return 'Tất cả công việc đã hoàn thành! 🎉';
            case 'completed':
                return 'Chưa có công việc nào đã hoàn thành';
            default:
                return 'Chưa có công việc nào. Hãy thêm công việc đầu tiên!';
        }
    }
    
    // Format todo date
    function formatTodoDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    // Update statistics
    function updateStats() {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        
        todoTotal.textContent = `Tổng: ${total}`;
        todoCompleted.textContent = `Hoàn thành: ${completed}`;
        todoPending.textContent = `Chưa xong: ${pending}`;
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Add new todo
    function addTodo(text) {
        if (!text.trim()) return;
        
        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.push(newTodo);
        saveTodos();
        initializeTodoApp();
        
        // Clear input
        todoInput.value = '';
        todoInput.focus();
        
        showNotification('Đã thêm công việc mới!', 'success');
    }
    
    // Toggle todo completion
    window.toggleTodo = function(id) {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].completed = !todos[todoIndex].completed;
            saveTodos();
            initializeTodoApp();
        }
    };
    
    // Delete todo
    window.deleteTodo = function(id) {
        if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            initializeTodoApp();
            showNotification('Đã xóa công việc', 'info');
        }
    };
    
    // Clear completed todos
    clearCompletedBtn.addEventListener('click', () => {
        const completedCount = todos.filter(todo => todo.completed).length;
        
        if (completedCount === 0) {
            showNotification('Không có công việc đã hoàn thành để xóa', 'info');
            return;
        }
        
        if (confirm(`Bạn có chắc chắn muốn xóa ${completedCount} công việc đã hoàn thành?`)) {
            todos = todos.filter(todo => !todo.completed);
            saveTodos();
            initializeTodoApp();
            showNotification(`Đã xóa ${completedCount} công việc đã hoàn thành`, 'success');
        }
    });
    
    // Filter todos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update current filter and re-render
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });
    
    // Add todo on button click
    addTodoBtn.addEventListener('click', () => {
        addTodo(todoInput.value);
    });
    
    // Add todo on Enter key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(todoInput.value);
        }
    });
    
    // Add CSS for todo app
    const style = document.createElement('style');
    style.textContent = `
        .todo-item {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            padding: var(--space-md);
            background: white;
            border-radius: var(--radius-md);
            margin-bottom: var(--space-sm);
            border: 1px solid var(--gray-200);
            transition: all var(--transition-fast);
        }
        .todo-item:hover {
            border-color: var(--primary-300);
            box-shadow: var(--shadow-sm);
        }
        .todo-item.completed {
            opacity: 0.7;
        }
        .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: var(--gray-500);
        }
        .todo-checkbox input {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .todo-content {
            flex: 1;
        }
        .todo-text {
            display: block;
            font-weight: 500;
            color: var(--gray-800);
            margin-bottom: 2px;
        }
        .todo-date {
            font-size: 0.85rem;
            color: var(--gray-500);
        }
        .todo-actions {
            display: flex;
            gap: var(--space-xs);
        }
        .todo-delete {
            width: 32px;
            height: 32px;
            border: none;
            background: rgba(244, 67, 54, 0.1);
            color: var(--error);
            border-radius: var(--radius-sm);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition-fast);
        }
        .todo-delete:hover {
            background: rgba(244, 67, 54, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize
    initializeTodoApp();
}

// ===========================================================================
// QUIZ SYSTEM
// ===========================================================================

function initQuiz() {
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    const submitBtn = document.getElementById('submitQuiz');
    const restartBtn = document.getElementById('restartQuiz');
    const questionContainer = document.getElementById('questionContainer');
    const quizResults = document.getElementById('quizResults');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const quizScoreSpan = document.getElementById('quizScore');
    const quizProgress = document.getElementById('quizProgress');
    
    if (!prevBtn) return;
    
    // Quiz questions
    const questions = [
        {
            question: 'Danh sách <code>ds = [10, 20, 30, 40, 50]</code>. Kết quả của <code>ds[1:4]</code> là gì?',
            options: [
                { text: '[10, 20, 30]', correct: false },
                { text: '[20, 30, 40]', correct: true },
                { text: '[20, 30, 40, 50]', correct: false },
                { text: '[10, 20, 30, 40]', correct: false }
            ],
            explanation: 'Cắt lát từ vị trí 1 đến 4 (không bao gồm 4): ds[1]=20, ds[2]=30, ds[3]=40'
        },
        {
            question: 'Phương thức nào dùng để thêm phần tử vào cuối danh sách?',
            options: [
                { text: 'insert()', correct: false },
                { text: 'append()', correct: true },
                { text: 'extend()', correct: false },
                { text: 'add()', correct: false }
            ],
            explanation: 'append() thêm phần tử vào cuối, insert() chèn tại vị trí, extend() nối danh sách'
        },
        {
            question: 'Làm thế nào để đảo ngược danh sách? (Chọn tất cả đáp án đúng)',
            options: [
                { text: 'ds.reverse()', correct: true },
                { text: 'ds.sort(reverse=True)', correct: false },
                { text: 'reversed(ds)', correct: true },
                { text: 'ds[::-1]', correct: true }
            ],
            explanation: 'Có 3 cách: reverse() đảo ngược tại chỗ, reversed() trả về iterator, ds[::-1] tạo danh sách mới đảo ngược'
        },
        {
            question: 'Đoạn code sau sẽ in ra gì?<br><code>ds = [1, 2, 3, 2, 4]<br>ds.remove(2)<br>print(ds)</code>',
            options: [
                { text: '[1, 3, 2, 4]', correct: true },
                { text: '[1, 2, 3, 4]', correct: false },
                { text: '[1, 3, 4]', correct: false },
                { text: 'Lỗi ValueError', correct: false }
            ],
            explanation: 'remove() xóa phần tử đầu tiên có giá trị 2, kết quả là [1, 3, 2, 4]'
        },
        {
            question: 'Phương thức pop() khác remove() như thế nào?',
            options: [
                { text: 'pop() xóa theo chỉ số, remove() xóa theo giá trị', correct: true },
                { text: 'pop() trả về giá trị bị xóa, remove() không trả về gì', correct: true },
                { text: 'pop() xóa phần tử cuối cùng nếu không có đối số', correct: true },
                { text: 'Tất cả đều đúng', correct: true }
            ],
            explanation: 'Tất cả các đáp án đều đúng: pop() linh hoạt hơn remove()'
        },
        {
            question: 'Kết quả của <code>len([1, 2, [3, 4]])</code> là gì?',
            options: [
                { text: '2', correct: false },
                { text: '3', correct: true },
                { text: '4', correct: false },
                { text: 'Lỗi', correct: false }
            ],
            explanation: 'Danh sách có 3 phần tử: 1, 2, và [3,4] (một danh sách lồng)'
        },
        {
            question: 'Làm thế nào để tạo một bản sao sâu (deep copy) của danh sách?',
            options: [
                { text: 'ds.copy()', correct: false },
                { text: 'ds[:]', correct: false },
                { text: 'list(ds)', correct: false },
                { text: 'copy.deepcopy(ds)', correct: true }
            ],
            explanation: 'Chỉ có deepcopy() sao chép toàn bộ cấu trúc, kể cả phần tử lồng nhau'
        },
        {
            question: 'Đoạn code sau sẽ in ra gì?<br><code>ds = [1, 2, 3]<br>for i, v in enumerate(ds, 1):<br>    print(i, v)</code>',
            options: [
                { text: '0 1, 1 2, 2 3', correct: false },
                { text: '1 1, 2 2, 3 3', correct: true },
                { text: '(0,1), (1,2), (2,3)', correct: false },
                { text: 'Lỗi', correct: false }
            ],
            explanation: 'enumerate(ds, 1) bắt đầu đếm từ 1, kết quả là (1,1), (2,2), (3,3)'
        },
        {
            question: 'Phương thức nào KHÔNG làm thay đổi danh sách gốc?',
            options: [
                { text: 'sort()', correct: false },
                { text: 'reverse()', correct: false },
                { text: 'sorted()', correct: true },
                { text: 'append()', correct: false }
            ],
            explanation: 'sorted() trả về danh sách mới đã sắp xếp, không thay đổi danh sách gốc'
        },
        {
            question: 'Kết quả của <code>[x**2 for x in range(5) if x % 2 == 0]</code> là gì?',
            options: [
                { text: '[0, 1, 4, 9, 16]', correct: false },
                { text: '[0, 4, 16]', correct: true },
                { text: '[1, 9]', correct: false },
                { text: '[0, 2, 4]', correct: false }
            ],
            explanation: 'List comprehension tạo danh sách bình phương của số chẵn từ 0 đến 4'
        }
    ];
    
    // Quiz state
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let score = 0;
    
    // Initialize quiz
    function initializeQuiz() {
        currentQuestionIndex = 0;
        userAnswers = new Array(questions.length).fill(null);
        score = 0;
        
        updateQuizDisplay();
        renderQuestion();
        updateButtons();
        updateProgress();
        
        // Hide results, show questions
        quizResults.style.display = 'none';
        questionContainer.style.display = 'block';
    }
    
    // Render current question
    function renderQuestion() {
        const question = questions[currentQuestionIndex];
        
        let optionsHTML = '';
        question.options.forEach((option, index) => {
            const isChecked = userAnswers[currentQuestionIndex] === index;
            const isMultiple = question.options.filter(opt => opt.correct).length > 1;
            
            optionsHTML += `
                <div class="quiz-option">
                    <input type="${isMultiple ? 'checkbox' : 'radio'}" 
                           name="quiz-answer" 
                           id="option-${index}"
                           ${isChecked ? 'checked' : ''}
                           onchange="handleAnswerChange(${index}, ${isMultiple})">
                    <label for="option-${index}">
                        ${option.text}
                    </label>
                </div>
            `;
        });
        
        questionContainer.innerHTML = `
            <div class="question">
                <h5>Câu ${currentQuestionIndex + 1}</h5>
                <p>${question.question}</p>
            </div>
            <div class="options">
                ${optionsHTML}
            </div>
        `;
        
        // Update display
        currentQuestionSpan.textContent = `Câu ${currentQuestionIndex + 1}/${questions.length}`;
    }
    
    // Handle answer change
    window.handleAnswerChange = function(optionIndex, isMultiple) {
        if (isMultiple) {
            // For multiple choice questions
            if (!userAnswers[currentQuestionIndex]) {
                userAnswers[currentQuestionIndex] = [];
            }
            
            const index = userAnswers[currentQuestionIndex].indexOf(optionIndex);
            if (index === -1) {
                userAnswers[currentQuestionIndex].push(optionIndex);
            } else {
                userAnswers[currentQuestionIndex].splice(index, 1);
            }
        } else {
            // For single choice questions
            userAnswers[currentQuestionIndex] = optionIndex;
        }
        
        // Enable next button if an answer is selected
        updateButtons();
    };
    
    // Update navigation buttons
    function updateButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        
        const hasAnswer = userAnswers[currentQuestionIndex] !== null &&
                         (!Array.isArray(userAnswers[currentQuestionIndex]) || 
                          userAnswers[currentQuestionIndex].length > 0);
        
        nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? 'inline-flex' : 'none';
        submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-flex' : 'none';
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.disabled = true;
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.disabled = !hasAnswer;
        }
    }
    
    // Update progress
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        quizProgress.style.width = `${progress}%`;
    }
    
    // Calculate score
    function calculateScore() {
        score = 0;
        
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            
            if (userAnswer === null) return;
            
            const correctOptions = question.options
                .map((opt, i) => opt.correct ? i : -1)
                .filter(i => i !== -1);
            
            if (Array.isArray(userAnswer)) {
                // Multiple choice
                if (userAnswer.length === correctOptions.length &&
                    userAnswer.every(opt => correctOptions.includes(opt))) {
                    score++;
                }
            } else {
                // Single choice
                if (correctOptions.length === 1 && userAnswer === correctOptions[0]) {
                    score++;
                }
            }
        });
        
        quizScoreSpan.textContent = `Điểm: ${score}/${questions.length}`;
    }
    
    // Show results
    function showResults() {
        calculateScore();
        
        let resultsHTML = `
            <div class="results-header">
                <h4>Kết Quả Bài Quiz</h4>
                <div class="score-display">
                    <span class="score">${score}/${questions.length}</span>
                    <span class="percentage">${Math.round((score / questions.length) * 100)}%</span>
                </div>
            </div>
            
            <div class="results-summary">
                <p>${getResultMessage()}</p>
            </div>
            
            <div class="detailed-results">
                <h5>Chi tiết các câu trả lời:</h5>
        `;
        
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = isAnswerCorrect(index);
            
            resultsHTML += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-question">
                        <strong>Câu ${index + 1}:</strong> ${question.question}
                    </div>
                    <div class="result-answer">
                        <strong>Đáp án của bạn:</strong> ${formatUserAnswer(index)}
                    </div>
                    <div class="result-correct">
                        <strong>Đáp án đúng:</strong> ${formatCorrectAnswer(index)}
                    </div>
                    <div class="result-explanation">
                        ${question.explanation}
                    </div>
                </div>
            `;
        });
        
        resultsHTML += '</div>';
        quizResults.innerHTML = resultsHTML;
        quizResults.style.display = 'block';
        questionContainer.style.display = 'none';
    }
    
    // Check if answer is correct
    function isAnswerCorrect(questionIndex) {
        const question = questions[questionIndex];
        const userAnswer = userAnswers[questionIndex];
        
        if (userAnswer === null) return false;
        
        const correctOptions = question.options
            .map((opt, i) => opt.correct ? i : -1)
            .filter(i => i !== -1);
        
        if (Array.isArray(userAnswer)) {
            return userAnswer.length === correctOptions.length &&
                   userAnswer.every(opt => correctOptions.includes(opt));
        } else {
            return correctOptions.length === 1 && userAnswer === correctOptions[0];
        }
    }
    
    // Format user's answer
    function formatUserAnswer(questionIndex) {
        const userAnswer = userAnswers[questionIndex];
        
        if (userAnswer === null) return 'Chưa trả lời';
        
        if (Array.isArray(userAnswer)) {
            if (userAnswer.length === 0) return 'Chưa trả lời';
            return userAnswer.map(opt => questions[questionIndex].options[opt].text).join(', ');
        } else {
            return questions[questionIndex].options[userAnswer].text;
        }
    }
    
    // Format correct answer
    function formatCorrectAnswer(questionIndex) {
        const question = questions[questionIndex];
        const correctOptions = question.options
            .map((opt, i) => opt.correct ? i : -1)
            .filter(i => i !== -1);
        
        return correctOptions.map(opt => question.options[opt].text).join(', ');
    }
    
    // Get result message based on score
    function getResultMessage() {
        const percentage = (score / questions.length) * 100;
        
        if (percentage >= 90) {
            return '🎉 Xuất sắc! Bạn đã nắm vững kiến thức về danh sách!';
        } else if (percentage >= 70) {
            return '👍 Tốt lắm! Bạn hiểu rõ về danh sách trong Python!';
        } else if (percentage >= 50) {
            return '👌 Khá tốt! Hãy ôn tập thêm một chút nữa!';
        } else {
            return '📚 Cần ôn tập thêm! Hãy xem lại bài học và thực hành nhiều hơn!';
        }
    }
    
    // Update quiz display
    function updateQuizDisplay() {
        currentQuestionSpan.textContent = `Câu ${currentQuestionIndex + 1}/${questions.length}`;
        quizScoreSpan.textContent = `Điểm: ${score}/${questions.length}`;
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
            updateButtons();
            updateProgress();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
            updateButtons();
            updateProgress();
        }
    });
    
    submitBtn.addEventListener('click', showResults);
    
    restartBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn làm lại bài quiz?')) {
            initializeQuiz();
        }
    });
    
    // Add CSS for quiz
    const style = document.createElement('style');
    style.textContent = `
        .quiz-option {
            margin-bottom: var(--space-sm);
            padding: var(--space-md);
            background: var(--gray-100);
            border-radius: var(--radius-md);
            border: 2px solid transparent;
            transition: all var(--transition-fast);
            cursor: pointer;
        }
        .quiz-option:hover {
            background: var(--gray-200);
        }
        .quiz-option input {
            margin-right: var(--space-sm);
        }
        .quiz-option label {
            cursor: pointer;
            display: inline;
        }
        .results-header {
            text-align: center;
            margin-bottom: var(--space-xl);
            padding: var(--space-xl);
            background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
            border-radius: var(--radius-lg);
        }
        .score-display {
            margin-top: var(--space-lg);
        }
        .score-display .score {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary-700);
            display: block;
        }
        .score-display .percentage {
            font-size: 1.5rem;
            color: var(--gray-600);
        }
        .result-item {
            padding: var(--space-lg);
            margin-bottom: var(--space-lg);
            border-radius: var(--radius-md);
            border-left: 4px solid;
        }
        .result-item.correct {
            background: rgba(76, 175, 80, 0.05);
            border-left-color: var(--success);
        }
        .result-item.incorrect {
            background: rgba(244, 67, 54, 0.05);
            border-left-color: var(--error);
        }
        .result-explanation {
            margin-top: var(--space-md);
            padding: var(--space-md);
            background: white;
            border-radius: var(--radius-sm);
            font-size: 0.9rem;
            color: var(--gray-600);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize
    initializeQuiz();
}

// ===========================================================================
// PRINT FUNCTIONALITY
// ===========================================================================

function initPrintFunctionality() {
    const printBtn = document.getElementById('printBtn');
    
    if (!printBtn) return;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
}

// ===========================================================================
// FULLSCREEN TOGGLE
// ===========================================================================

function initFullscreenToggle() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    
    if (!fullscreenToggle) return;
    
    fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Lỗi khi vào chế độ toàn màn hình: ${err.message}`);
            });
            fullscreenToggle.innerHTML = '<i class="fas fa-compress"></i> Thoát toàn màn hình';
        } else {
            document.exitFullscreen();
            fullscreenToggle.innerHTML = '<i class="fas fa-expand"></i> Toàn màn hình';
        }
    });
    
    // Update button text when fullscreen changes
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenToggle.innerHTML = '<i class="fas fa-expand"></i> Toàn màn hình';
        }
    });
}

// ===========================================================================
// UTILITY FUNCTIONS
// ===========================================================================

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    switch (type) {
        case 'success':
            icon = 'check-circle';
            break;
        case 'error':
            icon = 'exclamation-circle';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            break;
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add CSS for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: var(--space-md) var(--space-lg);
                background: white;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-xl);
                display: flex;
                align-items: center;
                gap: var(--space-md);
                z-index: var(--z-tooltip);
                animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                border-left: 4px solid;
                max-width: 400px;
            }
            .notification.info {
                border-left-color: var(--info);
            }
            .notification.success {
                border-left-color: var(--success);
            }
            .notification.error {
                border-left-color: var(--error);
            }
            .notification.warning {
                border-left-color: var(--warning);
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification.info i {
                color: var(--info);
            }
            .notification.success i {
                color: var(--success);
            }
            .notification.error i {
                color: var(--error);
            }
            .notification.warning i {
                color: var(--warning);
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Share page functionality
document.getElementById('sharePage')?.addEventListener('click', async () => {
    const shareData = {
        title: 'Bài 22: Kiểu Dữ Liệu Danh Sách - SGK Tin học 10',
        text: 'Khám phá bài học tương tác về kiểu dữ liệu danh sách trong Python',
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showNotification('Đã chia sẻ trang web thành công!', 'success');
        } else {
            // Fallback: Copy URL to clipboard
            await navigator.clipboard.writeText(window.location.href);
            showNotification('Đã sao chép link vào clipboard!', 'success');
        }
    } catch (err) {
        console.error('Lỗi khi chia sẻ:', err);
        showNotification('Không thể chia sẻ trang web', 'error');
    }
});

// Download PDF functionality
document.getElementById('downloadPDF')?.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Tính năng tải PDF đang được phát triển!', 'info');
});

// Download code functionality
document.getElementById('downloadCode')?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a blob with all the code
    const htmlCode = document.documentElement.outerHTML;
    const cssCode = Array.from(document.styleSheets)
        .map(sheet => {
            try {
                return Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\\n');
            } catch (e) {
                return '';
            }
        })
        .join('\\n');
    
    const jsCode = document.querySelector('script[src*="script.js"]')?.outerHTML || 
                   '// JavaScript code is in separate file';
    
    const fullCode = `=== HTML ===\\n${htmlCode}\\n\\n=== CSS ===\\n${cssCode}\\n\\n=== JavaScript ===\\n${jsCode}`;
    
    // Create download link
    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bai22-kieu-du-lieu-danh-sach-code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Đã tải mã nguồn về máy!', 'success');
});

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // All initialization is done in the main DOMContentLoaded listener
}