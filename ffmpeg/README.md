# 部分ffmpeg用法

## 前言
```
项目中有用到将多个mp4视频合成一个mp4，一个mp4切割成多个mp4文件的功能
```

## 查看文件信息
```python
ffmpeg -i input.mp4
```

## 多个mp4合成一个mp4文件
1. concat(不适用于mp4)
```python
ffmpeg -i "concat:input1|input2" -codec copy output
```
2. 先将mp4文件转化为ts，再ts合成mp4文件(本次使用)
- a.转为ts
    ```python
    ffmpeg -i input.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts input.ts
    ```
- b.ts合成mp4
    ```python
    ffmpeg -i "concat:input1.ts|input2.ts|input3.ts" -c copy -bsf:a aac_adtstoasc -movflags +faststart output.mp4
    ```

## 一个mp4切割成多个mp4文件
```python
ffmpeg -i input.mp4 -vf "crop=out_w:out_h:x:y" -y output.mp4
```
- out_w 是输出矩形的宽度
- out_h 是输出矩形的高度
- x:y specify the top left corner of the output rectangle
- 参考（https://video.stackexchange.com/questions/4563/how-can-i-crop-a-video-with-ffmpeg）

## mp4文件添加水印
```cmd
ffmpeg -i input.mp4 -i overlay.png -filter_complex "[1:v]scale=800x800 [ovrl], [0:v][ovrl]overlay=0:0 " -c:v libx26 -profile:v baseline -level 3.1 -s 368x368 -y 
```
- overlay.png为水印图片

## 参考
- https://stackoverflow.com/questions/7333232/how-to-concatenate-two-mp4-files-using-ffmpeg

- https://ffmpeg.org/