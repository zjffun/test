```
git checkout -b test/conflict1 master
echo conflict1 > test
git add .
git commit -mconflict1
git checkout -b test/conflict2 master
echo conflict2 > test
git add .
git commit -mconflict2

# merge
git merge test/conflict1
git checkout -2 test
git add test
git commit -mfix
git checkout test/conflict1
git merge test/conflict2

echo conflict11 >> test
git add test
git commit -mconflict11
git checkout test/conflict2
sed -i.bak '1s/^/conflict22\n/' test
rm test.bak
git add test
git commit -mconflict22

# will auto merge
git merge test/conflict1

git checkout master
git branch -D test/conflict1
git branch -D test/conflict2
```
