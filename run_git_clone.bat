::получаем curpath:
@for /f %%i in ("%0") do set curpath=%~dp0

::задаем основные переменные окружения
@CALL "%curpath%set_path.bat"


@echo ==================================================
@echo обновляем
git clone https://github.com/mixamarciv/log_watcher.git

@echo ==================================================
@echo все
@pause