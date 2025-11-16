
        // DOM Elements
        const bible = document.querySelector('.bible');
        const selectionContainer = document.querySelector('.selection-container');
        const oldTestamentBtn = document.getElementById('old-testament');
        const newTestamentBtn = document.getElementById('new-testament');
        const versionButtons = document.querySelectorAll('.version-btn');
        const bookGrid = document.getElementById('book-grid');
        const bookSelector = document.querySelector('.book-selector');
        const testamentTitle = document.getElementById('testament-title');
        const chapterSelector = document.querySelector('.chapter-selector');
        const chapterGrid = document.getElementById('chapter-grid');
        const chapterSelectionTitle = document.getElementById('chapter-selection-title');
        const bibleReader = document.querySelector('.bible-reader');
        const readerTitle = document.getElementById('reader-title');
        const versesContainer = document.getElementById('verses-container');
        const prevChapterBtn = document.getElementById('prev-chapter');
        const nextChapterBtn = document.getElementById('next-chapter');
        const backToTestamentBtn = document.getElementById('back-to-testament');
        const backToBooksBtn = document.getElementById('back-to-books');
        const backToChaptersBtn = document.getElementById('back-to-chapters');

        // State variables
        let currentTestament = '';
        let currentVersion = 'niv';
        let currentBook = '';
        let currentBookIndex = 0;
        let currentChapter = 1;
        let currentTestamentBooks = [];

        // Bible API base URL
        const BIBLE_API_BASE = 'https://bible-api.com';

        // Complete Bible data structure
        const bibleData = {
            oldTestament: [
                { name: 'Genesis', chapters: 50, abbreviation: 'gen' },
                { name: 'Exodus', chapters: 40, abbreviation: 'exo' },
                { name: 'Leviticus', chapters: 27, abbreviation: 'lev' },
                { name: 'Numbers', chapters: 36, abbreviation: 'num' },
                { name: 'Deuteronomy', chapters: 34, abbreviation: 'deu' },
                { name: 'Joshua', chapters: 24, abbreviation: 'jos' },
                { name: 'Judges', chapters: 21, abbreviation: 'jdg' },
                { name: 'Ruth', chapters: 4, abbreviation: 'rut' },
                { name: '1 Samuel', chapters: 31, abbreviation: '1sa' },
                { name: '2 Samuel', chapters: 24, abbreviation: '2sa' },
                { name: '1 Kings', chapters: 22, abbreviation: '1ki' },
                { name: '2 Kings', chapters: 25, abbreviation: '2ki' },
                { name: '1 Chronicles', chapters: 29, abbreviation: '1ch' },
                { name: '2 Chronicles', chapters: 36, abbreviation: '2ch' },
                { name: 'Ezra', chapters: 10, abbreviation: 'ezr' },
                { name: 'Nehemiah', chapters: 13, abbreviation: 'neh' },
                { name: 'Esther', chapters: 10, abbreviation: 'est' },
                { name: 'Job', chapters: 42, abbreviation: 'job' },
                { name: 'Psalms', chapters: 150, abbreviation: 'psa' },
                { name: 'Proverbs', chapters: 31, abbreviation: 'pro' },
                { name: 'Ecclesiastes', chapters: 12, abbreviation: 'ecc' },
                { name: 'Song of Solomon', chapters: 8, abbreviation: 'sng' },
                { name: 'Isaiah', chapters: 66, abbreviation: 'isa' },
                { name: 'Jeremiah', chapters: 52, abbreviation: 'jer' },
                { name: 'Lamentations', chapters: 5, abbreviation: 'lam' },
                { name: 'Ezekiel', chapters: 48, abbreviation: 'ezk' },
                { name: 'Daniel', chapters: 12, abbreviation: 'dan' },
                { name: 'Hosea', chapters: 14, abbreviation: 'hos' },
                { name: 'Joel', chapters: 3, abbreviation: 'jol' },
                { name: 'Amos', chapters: 9, abbreviation: 'amo' },
                { name: 'Obadiah', chapters: 1, abbreviation: 'oba' },
                { name: 'Jonah', chapters: 4, abbreviation: 'jon' },
                { name: 'Micah', chapters: 7, abbreviation: 'mic' },
                { name: 'Nahum', chapters: 3, abbreviation: 'nam' },
                { name: 'Habakkuk', chapters: 3, abbreviation: 'hab' },
                { name: 'Zephaniah', chapters: 3, abbreviation: 'zep' },
                { name: 'Haggai', chapters: 2, abbreviation: 'hag' },
                { name: 'Zechariah', chapters: 14, abbreviation: 'zec' },
                { name: 'Malachi', chapters: 4, abbreviation: 'mal' }
            ],
             newTestament: [
                { name: 'Matthew', chapters: 28, abbreviation: 'mat' },
                { name: 'Mark', chapters: 16, abbreviation: 'mrk' },
                { name: 'Luke', chapters: 24, abbreviation: 'luk' },
                { name: 'John', chapters: 21, abbreviation: 'jhn' },
                { name: 'Acts', chapters: 28, abbreviation: 'act' },
                { name: 'Romans', chapters: 16, abbreviation: 'rom' },
                { name: '1 Corinthians', chapters: 16, abbreviation: '1co' },
                { name: '2 Corinthians', chapters: 13, abbreviation: '2co' },
                { name: 'Galatians', chapters: 6, abbreviation: 'gal' },
                { name: 'Ephesians', chapters: 6, abbreviation: 'eph' },
                { name: 'Philippians', chapters: 4, abbreviation: 'php' },
                { name: 'Colossians', chapters: 4, abbreviation: 'col' },
                { name: '1 Thessalonians', chapters: 5, abbreviation: '1th' },
                { name: '2 Thessalonians', chapters: 3, abbreviation: '2th' },
                { name: '1 Timothy', chapters: 6, abbreviation: '1ti' },
                { name: '2 Timothy', chapters: 4, abbreviation: '2ti' },
                { name: 'Titus', chapters: 3, abbreviation: 'tit' },
                { name: 'Philemon', chapters: 1, abbreviation: 'phm' },
                { name: 'Hebrews', chapters: 13, abbreviation: 'heb' },
                { name: 'James', chapters: 5, abbreviation: 'jas' },
                { name: '1 Peter', chapters: 5, abbreviation: '1pe' },
                { name: '2 Peter', chapters: 3, abbreviation: '2pe' },
                { name: '1 John', chapters: 5, abbreviation: '1jn' },
                { name: '2 John', chapters: 1, abbreviation: '2jn' },
                { name: '3 John', chapters: 1, abbreviation: '3jn' },
                { name: 'Jude', chapters: 1, abbreviation: 'jud' },
                { name: 'Revelation', chapters: 22, abbreviation: 'rev' }
            ]
        };

        // Event Listeners
        bible.addEventListener('click', openBible);
        
        oldTestamentBtn.addEventListener('click', () => {
            currentTestament = 'oldTestament';
            showBooks();
        });
        
        newTestamentBtn.addEventListener('click', () => {
            currentTestament = 'newTestament';
            showBooks();
        });

        versionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                versionButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentVersion = btn.getAttribute('data-version');
                // If we're already in a chapter, reload with the new version
                if (bibleReader.classList.contains('active')) {
                    loadChapter();
                }
            });
        });

        prevChapterBtn.addEventListener('click', goToPrevChapter);
        nextChapterBtn.addEventListener('click', goToNextChapter);
        backToTestamentBtn.addEventListener('click', backToTestament);
        backToBooksBtn.addEventListener('click', backToBooks);
        backToChaptersBtn.addEventListener('click', backToChapters);

        // Functions
        function openBible() {
            bible.classList.add('open');
            setTimeout(() => {
                selectionContainer.classList.add('active');
            }, 2000);
        }

        function showBooks() {
            currentTestamentBooks = bibleData[currentTestament];
            bookGrid.innerHTML = '';
            
            currentTestamentBooks.forEach((book, index) => {
                const bookBtn = document.createElement('button');
                bookBtn.className = 'book-btn';
                bookBtn.textContent = book.name;
                bookBtn.addEventListener('click', () => {
                    currentBook = book.abbreviation;
                    currentBookIndex = index;
                    showChapters(book);
                });
                bookGrid.appendChild(bookBtn);
            });
            
            testamentTitle.textContent = `${currentTestament === 'oldTestament' ? 'Old' : 'New'} Testament Books`;
            bookSelector.classList.add('active');
        }

        function showChapters(book) {
            chapterGrid.innerHTML = '';
            
            for (let i = 1; i <= book.chapters; i++) {
                const chapterBtn = document.createElement('button');
                chapterBtn.className = 'chapter-btn';
                chapterBtn.textContent = i;
                chapterBtn.addEventListener('click', () => {
                    currentChapter = i;
                    loadChapter();
                });
                chapterGrid.appendChild(chapterBtn);
            }
            
            chapterSelectionTitle.textContent = `Select Chapter of ${book.name}`;
            chapterSelector.classList.add('active');
        }

        async function loadChapter() {
            // Show loading state
            versesContainer.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner"></i> Loading Scripture...
                </div>
            `;
            
            bibleReader.classList.add('active');
            
            try {
                // Build API URL
                const apiUrl = `${BIBLE_API_BASE}/${currentBook}+${currentChapter}?translation=${currentVersion}`;
                
                // Fetch data from Bible API
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch scripture');
                }
                
                const data = await response.json();
                
                // Update UI with fetched data
                readerTitle.textContent = data.reference;
                displayVerses(data.verses);
                
                // Update navigation buttons
                updateNavigationButtons();
            } catch (error) {
                console.error('Error fetching scripture:', error);
                versesContainer.innerHTML = `
                    <div class="loading">
                        <i class="fas fa-exclamation-triangle"></i> 
                        Error loading scripture. Please try again.
                    </div>
                `;
            }
        }

        function displayVerses(verses) {
            versesContainer.innerHTML = '';
            
            if (!verses || verses.length === 0) {
                versesContainer.innerHTML = '<div class="verse">No verses found for this chapter.</div>';
                return;
            }
            
            verses.forEach(verse => {
                const verseElement = document.createElement('div');
                verseElement.className = 'verse';
                verseElement.innerHTML = `<span class="verse-number">${verse.verse}</span> ${verse.text}`;
                versesContainer.appendChild(verseElement);
            });
        }

        function updateNavigationButtons() {
            const books = bibleData[currentTestament];
            const totalChapters = books[currentBookIndex].chapters;
            
            prevChapterBtn.disabled = currentChapter === 1;
            nextChapterBtn.disabled = currentChapter === totalChapters;
        }

        function goToPrevChapter() {
            if (currentChapter > 1) {
                currentChapter--;
                loadChapter();
            }
        }

        function goToNextChapter() {
            const books = bibleData[currentTestament];
            const totalChapters = books[currentBookIndex].chapters;
            
            if (currentChapter < totalChapters) {
                currentChapter++;
                loadChapter();
            }
        }

        function backToTestament() {
            bookSelector.classList.remove('active');
            chapterSelector.classList.remove('active');
            bibleReader.classList.remove('active');
        }

        function backToBooks() {
            chapterSelector.classList.remove('active');
            bibleReader.classList.remove('active');
        }

        function backToChapters() {
            bibleReader.classList.remove('active');
        }

        // Initialize with sample content
        setTimeout(() => {
            // Auto-open the Bible after a short delay for demo purposes
            if (!bible.classList.contains('open')) {
                openBible();
            }
        }, 1000);
        
