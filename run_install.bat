::����砥� curpath:
@for /f %%i in ("%0") do set curpath=%~dp0

::������ �᭮��� ��६���� ���㦥���
@CALL "%curpath%set_path.bat"


@echo ==================================================
@echo ��⠭���� ����ᨬ��⥩ �� package.json:
CALL npm install

::@echo ==================================================
::@echo ��⠭���� ���譨� ������᪨� js ������⥪ (�१ bower):
::CALL bower install

cd node_modules
git clone https://github.com/mixamarciv/mixa_std_js_functions.git

@echo ==================================================
@echo ��
@pause