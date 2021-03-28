# ./replace-run.sh < xxx.sh

reg=t1
rep=t2

tee | sed -e "s#$reg#$rep#" | sh
