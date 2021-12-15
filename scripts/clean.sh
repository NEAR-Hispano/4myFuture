set -e

echo
echo "Empezando limpieza del proyecto:"
echo

echo
echo "Eliminando carpeta \"out\"."
echo

sudo rm -rf ./out 

echo
echo "Eliminando carpeta \"neardev\"."
echo 

sudo rm -rf ./neardev

echo
echo "Eliminando carpeta \"dist\"."
echo 

sudo rm -rf ./dist

echo
echo "Eliminando carpeta \"cache\"."
echo 

sudo rm -rf ./.cache

echo
echo "Eliminando carpeta \"contract/build\"."
echo 

sudo rm -rf ./contract/build

echo
echo "Estructura del projecto limpio."
echo 