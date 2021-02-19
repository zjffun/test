rm -f test.txt
git checkout -b test/force-with-lease
touch test.txt
git add .
git commit -m "test"
git push

git reset --hard HEAD^
git push