::получаем curpath:
@for /f %%i in ("%0") do set curpath=%~dp0

::задаем основные переменные окружения
@CALL "%curpath%set_path.bat"

:: ===========================================================================
@cls

@taskkill /IM node.exe /f 


:: ===========================================================================
:: запускаем наш процесс
node.exe app.js %1 %2 %3 %4 %5 %6 %7 %8 %9


:: ===========================================================================
:: конец
::@pause
