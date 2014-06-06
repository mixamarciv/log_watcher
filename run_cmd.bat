@SET NODE_PATH_BIN1=d:\programs\nodejs
@SET NODE_PATH_BIN2=d:\program\nodejs
@SET GIT_PATH=d:\programs\nodejs\git

@SET PATH=%PATH%;%GIT_PATH%;%GIT_PATH%\bin;%GIT_PATH%\cmd
@SET PATH=%PATH%;%NODE_PATH_BIN1%
@SET PATH=%PATH%;%NODE_PATH_BIN2%
@SET PATH=%PATH%;%NODE_PATH_BIN1%\node_modules\npm\node_modules
@SET PATH=%PATH%;%NODE_PATH_BIN2%\node_modules\npm\node_modules
@SET PATH=%PATH%;%NODE_PATH_BIN1%\node_modules\.bin\
@SET PATH=%PATH%;%NODE_PATH_BIN2%\node_modules\.bin\

@SET NODE_PATH=.
cmd