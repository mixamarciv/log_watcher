::����砥� curpath:
@for /f %%i in ("%0") do set curpath=%~dp0

::������ �᭮��� ��६���� ���㦥���
@CALL "%curpath%set_path.bat"


@echo ==================================================
@echo ������塞
git clone https://github.com/mixamarciv/log_watcher.git

@echo ==================================================
@echo ��
@pause