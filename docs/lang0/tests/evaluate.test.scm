(import "./nat-church.scm" zero one two three add)

(add one (add two three))
(add (add one two) three)
