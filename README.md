# Korepetycje

Aplikacja do zarządzania korepetycjami MOSTowymi ([https://most.salezjanie.pl/korepetycje-mostowe/](https://most.salezjanie.pl/korepetycje-mostowe/)). Aktualne funkcjonalności:

- możliwość zgłaszania się do korepetycji przez uczniów
- możliwość zgłaszania dziecka przez rodzica
- możliwość zgłoszenia się studenta jako korepetytora

Aplikacja jast hostowana na firebase ([https://most-korepetycje.firebaseapp.com/](https://most-korepetycje.firebaseapp.com/form)) i korzysta z frameworku Angular 11.

# Lista zmian

## Wersja 1.3.0

- **feature: wiązanie uczniów z korepetytorami**
- feature: dodana możliwość usuwania uczniów i korepetytorów
- perf: zwiększenie wydajności konsoli administracyjnej przy nawigowaniu między listą uczniów/korpetytorów a widokami szczegółowymi
- improvement: dodanie przycisków "zapisz zmiany" na stronach edycji korepetytorów i uczniów

## Wersja 1.2.0

- **feature: konsola administratora** z możliwością przeglądania aktualnie zgłoszonych uczniów i korepetytorów oraz modyfikowania ustawień powiadomień email o nowym uczniu/korepetytorze. Zabezpieczona mechanizmem logowania.
- bugfix: zmiana maila z 'grzechu1997@gmail.com' do 'sda.most.korepetycje@gmail.com'
- bugfix: poprawione zapisywanie daty zgłoszenia ucznia i korepetytora

## Wersja 1.1.2

- bugfix: zmiana domyślnej ikony `favicon` na mostową
- bugfix: zmiana domyślnego tytułu z 'Korepetycje' na 'Korepetycje MOSTowe'

## Wersja 1.1.1

- minor feature: notyfikacja o pandemii COVID-19 i zmianie prowadzenia korpetycji
- minor feature: zapisywanie dodatkowych danych przy wypełnianiu formularza ucznia/rodzica (czy uczęszczał na korepetycje, imię i nazwisko poprzedniego tutora, czy zgłoszony sam czy przez rodzica)
- bugfix: w dialogu o błędzie: istniejący email, email nie był wyświetlany jeśli wypełnialiśmy formularz w trybie rodzica ([#9](https://github.com/tao24/korepetycje/issues/9))

## Wersja 1.1.0

- notyfikacje email dla managera przy wypełnieniu formularza ([#1](https://github.com/tao24/korepetycje/issues/1))

## Wersja 1.0.0

- możliwość zgłaszania się do korepetycji przez uczniów
- możliwość zgłaszania dziecka przez rodzica
- możliwość zgłoszenia się studenta jako korepetytora
