本地 ref 和远程 ref 不同时会提交失败。

用来确保提交时远程 ref 没有别人的新提交。比如：需要强推一些改变，但怕强推请求到服务器之前有人 push 了新提交，或者怕强推前忘了合并别人的提交时，可以加上这个参数阻止提交。

```sh
# clean
git checkout master
git branch -D test/force-with-lease
rm -f test.txt

# create branch
git checkout -b test/force-with-lease
touch test.txt
git add test.txt
git commit -m "test"
git push --set-upstream origin test/force-with-lease

# success
git reset --hard HEAD^
git push --force-with-lease

# reset
git reset --hard HEAD@{1}
git push --force-with-lease

# fail
git reset --hard HEAD^
git update-ref refs/remotes/origin/test/force-with-lease HEAD
git push --force-with-lease

# success
git fetch
git push --force-with-lease

# clean
git push :test/force-with-lease
```
