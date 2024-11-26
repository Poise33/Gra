$(document).ready(function () {

    // Tablica zawierająca możliwe kolory do gry
    const colors = ["red", "blue", "green", "yellow"];
    
    // Tablice do przechowywania wzorca gry i wzorca klikniętego przez użytkownika
    let gamePattern = [];
    let userClickedPattern = [];
    
    // Zmienna śledząca aktualny poziom gry
    let level = 0;
    
    // Zmienna sprawdzająca, czy gra już się rozpoczęła
    let started = false;

    // Funkcja uruchamiająca grę po naciśnięciu dowolnego klawisza
    $(document).keypress(function () {
    
        // Sprawdzamy, czy gra jeszcze się nie rozpoczęła
        if (!started) {
        
            // Zaktualizuj tytuł poziomu wyświetlając obecny poziom
            $("#level-title").text(`Poziom: ${level}`);
            
            // Wywołaj funkcję generującą kolejny ciąg sekwencji
            nextSequence();
            
            // Ustaw flagę 'started' na true, co oznacza, że gra się rozpoczęła
            started = true;
        }
    });
    
    // Funkcja, która obsługuje kliknięcie przycisku (koloru) przez użytkownika
    $(".btn").click(function () {
    
        // Pobierz kolor, który użytkownik kliknął
        const userChosenColor = $(this).attr("id");
        
        // Dodaj wybrany kolor do wzorca klikniętego przez użytkownika
        userClickedPattern.push(userChosenColor);
        
        // Odtwórz dźwięk odpowiadający wybranemu kolorowi
        playSound(userChosenColor);
        
        // Dodaj animację kliknięcia (efekt przyciśnięcia przycisku)
        animatePress(userChosenColor);
        
        // Sprawdź, czy kliknięcie użytkownika jest poprawne na danym etapie gry
        checkAnswer(userClickedPattern.length - 1);
    });
    
    // Funkcja generująca kolejny ciąg sekwencji (losowy kolor i zwiększenie poziomu)
    function nextSequence() {
    
        // Zresetuj wzorzec kliknięty przez użytkownika na nową sekwencję
        userClickedPattern = [];
        
        // Zwiększ licznik poziomu
        level++;
        
        // Zaktualizuj wyświetlanie poziomu
        $("#level-title").text(`Poziom: ${level}`);
        
        // Wygeneruj losową liczbę między 0 a 3
        const randomNumber = Math.floor(Math.random() * 4);
        
        // Wybierz losowy kolor z tablicy na podstawie wygenerowanej liczby
        const randomChosenColor = colors[randomNumber];
        
        // Dodaj losowy kolor do wzorca gry
        gamePattern.push(randomChosenColor);
        
        // Dodaj efekt migania dla losowego koloru
        $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
        
        // Odtwórz dźwięk odpowiadający losowemu kolorowi
        playSound(randomChosenColor);
    }
    
    // Funkcja odtwarzająca dźwięk odpowiadający wybranemu kolorowi
    function playSound(name) {
    
        // Tworzymy nowy obiekt audio na podstawie ścieżki dźwiękowej
        const audio = new Audio(`sounds/${name}.mp3`);
        
        // Odtwarzamy dźwięk
        audio.play();
    }
    
    // Funkcja dodająca animację przycisku (efekt naciśnięcia)
    function animatePress(currentColor) {
    
        // Dodaj klasę "pressed" do klikniętego przycisku (koloru)
        $(`#${currentColor}`).addClass("pressed");
        
        // Po 100 ms usuń klasę "pressed", aby zresetować animację
        setTimeout(() => {
            $(`#${currentColor}`).removeClass("pressed");
        }, 100);
    }
    
    // Funkcja sprawdzająca, czy odpowiedź użytkownika jest poprawna
    function checkAnswer(currentLevel) {
    
        // Sprawdzamy, czy kolor w wzorcu gry zgadza się z tym, co kliknął użytkownik
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
            // Jeśli użytkownik kliknął wszystkie kolory poprawnie, sprawdzamy, czy osiągnął koniec sekwencji
            if (userClickedPattern.length === gamePattern.length) {
            
                // Jeśli tak, wywołaj funkcję, aby przejść do następnej sekwencji po krótkiej przerwie
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        
        // Jeśli odpowiedź jest błędna
        } else {
        
            // Odtwórz dźwięk błędu
            playSound("wrong");
            
            // Dodaj klasę "game-over" do ciała, aby pokazać efekt zakończenia gry
            $("body").addClass("game-over");
            
            // Zaktualizuj tytuł, informując o przegranej
            $("#level-title").text("Przegrałeś! Wciśnij dowolny klawisz, aby zacząć od nowa.");
            
            // Po krótkiej przerwie usuń efekt "game-over"
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            
            // Zresetuj grę
            startOver();
        }
    }
    
    // Funkcja resetująca grę po przegranej
    function startOver() {
    
        // Zresetuj poziom
        level = 0;
        
        // Zresetuj wzorzec gry
        gamePattern = [];
        
        // Ustaw flagę 'started' na false, aby gra mogła się zacząć od nowa
        started = false;
    }
    
});
