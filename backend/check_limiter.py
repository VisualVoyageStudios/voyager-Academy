import ast, sys

def check(path):
    tree = ast.parse(open(path, encoding="utf-8").read())
    bad = 0
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            limited = any("limiter" in ast.unparse(d) and ".limit" in ast.unparse(d) for d in node.decorator_list)
            if limited:
                args = {a.arg for a in node.args.args + node.args.kwonlyargs}
                if "request" not in args and "websocket" not in args:
                    print(f"{path}:{node.lineno}: {node.name}() has @limiter.limit but no 'request' parameter")
                    bad += 1
    print("OK: every limited route has a request parameter" if not bad else f"{bad} problem(s)")

for p in sys.argv[1:] or ["main.py"]:
    check(p)