alice
=====

Simple e-magazine viewer

by Anton Melnikov, 2013


Tips
====

PDF to JPEGs
------------
gs -dSAFER -dNOPAUSE -sDEVICE=jpeg -r600  -dJPEGQ=100  -sOutputFile=extracted/%d.jpg lamoda2.pdf -dTextAlphaBits=32  -dGraphicsAlphaBits=32 -dDOINTERPOLATE -dCOLORSCREEN

JPEGs to sprite
---------------
montage -geometry 295x195+0+0 -tile 57x1 *.jpg ../sprite.png
convert -quality 90 sprite.png sprite.jpg