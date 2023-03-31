import glob
import os

filenames = glob.glob("*.png")
filenames.sort()

for i in range(len(filenames)):
    filename = filenames[i]
    output   = str(i+44).zfill(4) + ".jpg"
    cmd = f"convert \"{filename}\" {output}"
    # print(cmd)
    os.system(cmd)
